import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Trash2, Edit, Plus, LogOut, FileText } from 'lucide-react';
import SEO from '../components/SEO';

const SESSION_KEY = 'koriname_admin_session';

export default function Admin() {
  const [token, setToken] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [view, setView] = useState('list'); // 'list' | 'editor'
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Editor states
  const [formData, setFormData] = useState({ name: '', type: 'my-name', content: '' });

  // Quill Modules (matching standard toolbar)
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'blockquote'],
      ['clean']
    ],
  };

  const types = [
    { value: 'my-name', label: 'Transliteración' },
    { value: 'saju', label: 'Saju (Nacimiento)' },
    { value: 'meaning', label: 'Significado' }
  ];

  // 1. Session Management
  useEffect(() => {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        // Valid for 24 hours
        if (Date.now() - session.timestamp < 24 * 60 * 60 * 1000) {
          setToken(session.token);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch (e) {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput.trim()) {
      const session = {
        token: passwordInput.trim(),
        timestamp: Date.now()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setToken(session.token);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setToken(null);
    setView('list');
  };

  // 2. Fetching Data
  useEffect(() => {
    if (token && view === 'list') {
      fetchArticles();
    }
  }, [token, view]);

  const fetchArticles = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/articles?list=true', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      } else {
        if (res.status === 401) handleLogout();
        setError('Error al obtener artículos o autorización denegada.');
      }
    } catch (err) {
      setError('Error de red.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Actions
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este artículo?')) return;
    try {
      const res = await fetch(`/api/articles?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setArticles(articles.filter(a => a.id !== id));
      } else {
        alert('Error al eliminar');
      }
    } catch {
      alert('Error de red al eliminar');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setView('list');
      } else {
        setError(`Error: ${data.error}`);
      }
    } catch (err) {
      setError('Error de red al intentar guardar.');
    } finally {
      setLoading(false);
    }
  };

  const openEditor = (article = null) => {
    if (article) {
      // Need to fetch full article to get content, list endpoint only gives summary
      fetchFullArticleAndEdit(article.name, article.type);
    } else {
      setFormData({ name: '', type: 'my-name', content: '' });
      setView('editor');
    }
  };

  const fetchFullArticleAndEdit = async (name, type) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles?name=${name}&type=${type}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({ name: data.name, type: data.type, content: data.content || '' });
        setView('editor');
      } else {
        alert('No se pudo cargar el artículo completo.');
      }
    } catch {
      alert('Error de red.');
    } finally {
      setLoading(false);
    }
  };

  // Renders
  if (!token) {
    return (
      <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <SEO title="Login Admin | Koriname" />
        <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div className="card text-center">
            <h1 className="body-lg mb-4" style={{ fontWeight: 600 }}>Acceso Restringido</h1>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="password" 
                placeholder="Contraseña"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
                required
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--outline-variant)' }}
              />
              <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO title="Dashboard | Koriname" />
      <section className="section" style={{ minHeight: '80vh', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 className="display-sm">Dashboard</h1>
            <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem 1rem', background: 'var(--surface-container)', color: 'var(--on-surface-variant)' }}>
              <LogOut size={16} style={{ marginRight: '0.5rem' }}/> Salir
            </button>
          </div>

          {error && (
            <div style={{ padding: '1rem', marginBottom: '2rem', background: '#ffebee', color: '#c62828', borderRadius: '8px' }}>
              {error}
            </div>
          )}

          {view === 'list' && (
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="body-lg" style={{ fontWeight: 600 }}>Tus Artículos</h2>
                <button onClick={() => openEditor()} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                  <Plus size={16} style={{ marginRight: '0.5rem' }}/> Nuevo Artículo
                </button>
              </div>

              {loading ? (
                <p>Cargando artículos...</p>
              ) : articles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--surface-container-lowest)', borderRadius: '1rem' }}>
                  <FileText size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                  <p>No hay artículos creados todavía.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--outline-variant)' }}>
                        <th style={{ padding: '1rem', color: 'var(--on-surface-variant)' }}>Nombre</th>
                        <th style={{ padding: '1rem', color: 'var(--on-surface-variant)' }}>Categoría</th>
                        <th style={{ padding: '1rem', color: 'var(--on-surface-variant)' }}>Última Edición</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map(art => (
                        <tr key={art.id} style={{ borderBottom: '1px solid var(--outline-variant)' }}>
                          <td style={{ padding: '1rem', fontWeight: 500 }}>{art.name}</td>
                          <td style={{ padding: '1rem' }}>
                            <span className="badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                              {types.find(t => t.value === art.type)?.label || art.type}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', color: 'var(--on-surface-variant)' }}>
                            {new Date(art.updated_at).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button onClick={() => openEditor(art)} className="btn" style={{ padding: '0.5rem', background: 'transparent' }}>
                              <Edit size={18} color="var(--primary)" />
                            </button>
                            <button onClick={() => handleDelete(art.id)} className="btn" style={{ padding: '0.5rem', background: 'transparent' }}>
                              <Trash2 size={18} color="#e53935" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {view === 'editor' && (
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="body-lg" style={{ fontWeight: 600 }}>Editar Artículo</h2>
                <button onClick={() => setView('list')} className="btn" style={{ padding: '0.5rem 1rem', background: 'var(--surface-container-low)' }}>
                  Volver
                </button>
              </div>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nombre Objetivo (ej. cesar)</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value.toLowerCase() })}
                      required
                      placeholder="minúsculas y sin acentos"
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--outline-variant)' }}
                    />
                  </div>
                  <div style={{ flex: '1 1 200px' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Categoría de Página</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--outline-variant)' }}
                    >
                      {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ paddingBottom: '3rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Contenido</label>
                  <ReactQuill 
                    theme="snow" 
                    value={formData.content} 
                    onChange={val => setFormData({ ...formData, content: val })}
                    modules={modules}
                    style={{ height: '300px', background: 'var(--surface)', borderRadius: '8px' }}
                    placeholder="Escribe el artículo aquí..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading || !formData.name || !formData.content}
                  style={{ alignSelf: 'flex-start', padding: '0.8rem 2.5rem', marginTop: '1rem' }}
                >
                  {loading ? 'Guardando...' : 'Guardar Artículo'}
                </button>
              </form>
            </div>
          )}
          
        </div>
      </section>
    </>
  );
}
