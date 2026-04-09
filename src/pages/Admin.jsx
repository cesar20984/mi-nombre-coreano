import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Trash2, Edit, Plus, LogOut, FileText, Search, Send, CheckCircle, XCircle, ExternalLink, Eye, EyeOff } from 'lucide-react';
import SEO from '../components/SEO';

const SESSION_KEY = 'koriname_admin_session';

const cleanName = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export default function Admin() {
  const [token, setToken] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [view, setView] = useState('list'); // 'list' | 'editor' | 'searches'
  
  const [articles, setArticles] = useState([]);
  const [searches, setSearches] = useState([]);
  const [interlinks, setInterlinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Editor states
  const [formData, setFormData] = useState({ name: '', type: 'my-name', content: '' });

  // Manual Webhook form states
  const [manualName, setManualName] = useState('');
  const [manualType, setManualType] = useState('my-name');
  const [manualStatus, setManualStatus] = useState('');
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkNames, setBulkNames] = useState('');
  const [bulkProgress, setBulkProgress] = useState({ current: 0, total: 0 });
  
  // Hiding state
  const [hiddenKeys, setHiddenKeys] = useState(() => {
    const saved = localStorage.getItem('koriname_hidden_keys');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTab, setSearchTab] = useState('active'); // 'active' | 'hidden'
  const [mentionTab, setMentionTab] = useState('active'); // 'active' | 'hidden'

  useEffect(() => {
    localStorage.setItem('koriname_hidden_keys', JSON.stringify(hiddenKeys));
  }, [hiddenKeys]);

  const toggleHide = (key) => {
    setHiddenKeys(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

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
    { value: 'meaning', label: 'Significado' },
    { value: 'dictionary_not_found', label: 'Búsqueda Fallida (Diccionario)' }
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
    if (token) {
      if (view === 'list') fetchArticles();
      else if (view === 'searches') fetchSearches();
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

  const fetchSearches = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/searches', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSearches(data);
      } else {
        if (res.status === 401) handleLogout();
        setError('Error al obtener búsquedas.');
      }
    } catch (err) {
      setError('Error de red al obtener búsquedas.');
    } finally {
      setLoading(false);
    }
  };

  const fetchInterlinks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/interlinks', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setInterlinks(data);
      } else {
        if (res.status === 401) handleLogout();
        setError('Error al obtener menciones.');
      }
    } catch (err) {
      setError('Error de red al obtener menciones.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendWebhook = async (search) => {
    try {
      // 1. Send webhook
      const res = await fetch('/api/searches', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: search.name,
          type: search.type
        })
      });

      if (!res.ok) throw new Error('Webhook error');
      
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const handleBulkSend = async () => {
    const list = bulkNames.split('\n').map(n => n.trim()).filter(n => n);
    if (list.length === 0) return alert('La lista está vacía');
    
    if (!window.confirm(`¿Enviar ${list.length} nombres al webhook?`)) return;

    setLoading(true);
    setBulkProgress({ current: 0, total: list.length });
    
    for (let i = 0; i < list.length; i++) {
      setBulkProgress(prev => ({ ...prev, current: i + 1 }));
      await handleSendWebhook({ name: cleanName(list[i]), type: manualType });
      if (i < list.length - 1) {
        await sleep(1000); // 1 second delay
      }
    }

    setLoading(false);
    setBulkProgress({ current: 0, total: 0 });
    setBulkNames('');
    setBulkMode(false);
    alert('Envío masivo completado');
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
      const normalizedData = { 
        ...formData, 
        name: cleanName(formData.name) 
      };

      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(normalizedData)
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
        setFormData({ name: data.title || data.name, type: data.type, content: data.content || '' });
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
            
            {/* Manual Webhook Sender */}
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                if(!manualName) return;
                setManualStatus('Enviando...');
                const res = await handleSendWebhook({ name: cleanName(manualName), type: manualType });
                if (res.success) {
                  setManualStatus('OK');
                  setManualName('');
                  setTimeout(() => setManualStatus(''), 1000);
                } else {
                  setManualStatus('');
                  alert('Error enviando al webhook');
                }
              }}
              className="card" 
              style={{ padding: '0.75rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--surface-container-low)' }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Envío Manual:</span>
              <input 
                type="text" 
                placeholder="Nombre..." 
                value={manualName} 
                onChange={(e) => setManualName(e.target.value)}
                style={{ padding: '0.4rem', borderRadius: '0.4rem', border: '1px solid var(--outline-variant)', fontSize: '0.85rem', width: '120px' }}
              />
              <select 
                value={manualType} 
                onChange={(e) => setManualType(e.target.value)}
                style={{ padding: '0.4rem', borderRadius: '0.4rem', border: '1px solid var(--outline-variant)', fontSize: '0.85rem' }}
              >
                {types.filter(t => t.value !== 'dictionary_not_found').map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <button 
                type="submit"
                disabled={manualStatus === 'Enviando...'}
                className="btn btn-primary"
                style={{ 
                  padding: '0.4rem 0.8rem', 
                  fontSize: '0.85rem',
                  minWidth: '85px',
                  background: manualStatus === 'OK' ? '#4CAF50' : manualStatus === 'Enviando...' ? 'var(--outline-variant)' : '',
                  borderColor: manualStatus === 'OK' ? '#4CAF50' : ''
                }}
              >
                {manualStatus === 'OK' ? '¡Listo!' : manualStatus === 'Enviando...' ? '...' : <><Send size={14} /> Enviar</>}
              </button>
              <button 
                type="button"
                onClick={() => setBulkMode(!bulkMode)}
                className="btn"
                style={{ padding: '0.4rem', background: 'transparent', color: 'var(--primary)' }}
                title="Envío Masivo"
              >
                <Plus size={20} style={{ transform: bulkMode ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
            </form>

            <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem 1rem', background: 'var(--surface-container)', color: 'var(--on-surface-variant)' }}>
              <LogOut size={16} style={{ marginRight: '0.5rem' }}/> Salir
            </button>
          </div>

          {bulkMode && (
            <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--surface-container-low)' }}>
              <h3 className="body-md mb-2" style={{ fontWeight: 600 }}>Envío Masivo (Webhook)</h3>
              <p className="body-sm mb-3" style={{ color: 'var(--on-surface-variant)' }}>Escribe un nombre por línea. Se enviarán con la categoría seleccionada arriba con 1s de retraso.</p>
              <textarea
                value={bulkNames}
                onChange={(e) => setBulkNames(e.target.value)}
                placeholder="Juan&#10;María&#10;Pedro..."
                rows="6"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--outline-variant)', marginBottom: '1rem', fontFamily: 'monospace' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>
                  {bulkProgress.total > 0 && `Progreso: ${bulkProgress.current} / ${bulkProgress.total}`}
                </div>
                <button 
                  disabled={loading || !bulkNames.trim()}
                  onClick={handleBulkSend}
                  className="btn btn-primary"
                >
                  {loading ? 'Procesando...' : 'Iniciar Envío Masivo'}
                </button>
              </div>
            </div>
          )}

          {view !== 'editor' && (
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <button 
                onClick={() => setView('list')} 
                className={`btn ${view === 'list' ? 'btn-primary' : ''}`}
                style={{ background: view === 'list' ? '' : 'var(--surface-container)' }}
              >
                Artículos
              </button>
              <button 
                onClick={() => setView('searches')} 
                className={`btn ${view === 'searches' ? 'btn-primary' : ''}`}
                style={{ background: view === 'searches' ? '' : 'var(--surface-container)' }}
              >
                Búsquedas
              </button>
              <button 
                onClick={() => { setView('interlinks'); fetchInterlinks(); }} 
                className={`btn ${view === 'interlinks' ? 'btn-primary' : ''}`}
                style={{ background: view === 'interlinks' ? '' : 'var(--surface-container)' }}
              >
                Menciones
              </button>
            </div>
          )}

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
                          <td style={{ padding: '1rem', fontWeight: 500 }}>
                            {art.title || art.name}
                            {art.title && art.title.toLowerCase() !== art.name && (
                              <div style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--on-surface-variant)' }}>
                                URL: {art.name}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span className="badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                              {types.find(t => t.value === art.type)?.label || art.type}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', color: 'var(--on-surface-variant)' }}>
                            {new Date(art.updated_at).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                            {(() => {
                              const TYPE_PATHS = { 'my-name': 'nombre-en-coreano', 'saju': 'saju', 'meaning': 'significado-nombre-coreano' };
                              const path = TYPE_PATHS[art.type] || art.type;
                              return (
                                <a
                                  href={`/${path}/${art.name.replace(/\s+/g, '-')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn"
                                  style={{ padding: '0.4rem', color: 'var(--on-surface-variant)' }}
                                  title="Ver en la web"
                                >
                                  <ExternalLink size={16} />
                                </a>
                              );
                            })()}
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
          {view === 'searches' && (
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h2 className="body-lg" style={{ fontWeight: 600 }}>Registro de Búsquedas</h2>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button 
                      onClick={() => setSearchTab('active')}
                      className="btn"
                      style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem', background: searchTab === 'active' ? 'var(--primary)' : 'var(--surface-container)', color: searchTab === 'active' ? 'white' : 'var(--on-surface-variant)' }}
                    >
                      Activas ({searches.filter(s => !hiddenKeys.includes(`search:${s.name}:${s.type}`)).length})
                    </button>
                    <button 
                      onClick={() => setSearchTab('hidden')}
                      className="btn"
                      style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem', background: searchTab === 'hidden' ? 'var(--primary)' : 'var(--surface-container)', color: searchTab === 'hidden' ? 'white' : 'var(--on-surface-variant)' }}
                    >
                      Ocultas ({searches.filter(s => hiddenKeys.includes(`search:${s.name}:${s.type}`)).length})
                    </button>
                  </div>
                </div>
                <button onClick={fetchSearches} className="btn" style={{ padding: '0.5rem 1rem', background: 'var(--surface-container-low)' }}>
                  Actualizar Lista
                </button>
              </div>

              {loading ? (
                <p>Cargando búsquedas...</p>
              ) : searches.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--surface-container-lowest)', borderRadius: '1rem' }}>
                   <Search size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                   <p>No hay búsquedas registradas.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--outline-variant)' }}>
                        <th style={{ padding: '1rem', color: 'var(--on-surface-variant)' }}>Nombre / Búsqueda</th>
                        <th style={{ padding: '1rem', color: 'var(--on-surface-variant)' }}>Categoría</th>
                        <th style={{ padding: '1rem', color: 'var(--on-surface-variant)', textAlign: 'center' }}>Consultas</th>
                        <th style={{ padding: '1rem', color: 'var(--on-surface-variant)' }}>Última vez</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searches
                        .filter(s => {
                          const isHidden = hiddenKeys.includes(`search:${s.name}:${s.type}`);
                          return searchTab === 'hidden' ? isHidden : !isHidden;
                        })
                        .map(s => {
                          const itemKey = `search:${s.name}:${s.type}`;
                          const exists = articles.some(a => a.name.toLowerCase() === s.name.replace(/-/g, ' ').toLowerCase() && a.type === s.type);
                          return (
                          <tr key={s.id} style={{ borderBottom: '1px solid var(--outline-variant)' }}>
                            <td style={{ padding: '1rem', fontWeight: 500, textTransform: 'capitalize' }}>
                              {s.name}
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <span className="badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                                {types.find(t => t.value === s.type)?.label || s.type}
                              </span>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                              {s.count}
                            </td>
                            <td style={{ padding: '1rem', color: 'var(--on-surface-variant)', fontSize: '0.9rem' }}>
                              {new Date(s.updated_at).toLocaleString()}
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                              <button 
                                onClick={() => toggleHide(itemKey)} 
                                className="btn" 
                                style={{ padding: '0.4rem', color: 'var(--on-surface-variant)' }}
                                title={searchTab === 'hidden' ? "Mostrar" : "Ocultar"}
                              >
                                {searchTab === 'hidden' ? <Eye size={18} /> : <EyeOff size={18} />}
                              </button>

                              <button 
                                onClick={() => handleSendWebhook(s)} 
                                className="btn btn-primary" 
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', gap: '0.3rem' }}
                                title="Enviar al Webhook (N8N)"
                              >
                                <Send size={14} /> Enviar
                              </button>
                              
                              {exists ? (() => {
                                const TYPE_PATHS = { 'my-name': 'nombre-en-coreano', 'saju': 'saju', 'meaning': 'significado-nombre-coreano' };
                                const path = TYPE_PATHS[s.type] || s.type;
                                return (
                                  <a
                                    href={`/${path}/${s.name.replace(/\s+/g, '-')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn"
                                    style={{ padding: '0.4rem', color: 'var(--on-surface-variant)' }}
                                    title="Ver en la web"
                                  >
                                    <ExternalLink size={16} />
                                  </a>
                                );
                              })() : (
                                <div style={{ width: '34px' }}></div>
                              )}
                              
                              <div 
                                style={{ 
                                  padding: '0.4rem 0.8rem',
                                  borderRadius: '0.5rem',
                                  background: exists ? '#4CAF50' : 'var(--surface-container-highest)', 
                                  color: exists ? '#FFFFFF' : '#9E9E9E',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                title={exists ? "Artículo ya existe" : "Artículo no existe"}
                              >
                                {exists ? <CheckCircle size={24} strokeWidth={2.5} /> : <XCircle size={24} />}
                              </div>
                            </td>
                          </tr>
                        )})}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {view === 'interlinks' && (
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h2 className="body-lg" style={{ fontWeight: 600 }}>Menciones en Artículos</h2>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button 
                      onClick={() => setMentionTab('active')}
                      className="btn"
                      style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem', background: mentionTab === 'active' ? 'var(--primary)' : 'var(--surface-container)', color: mentionTab === 'active' ? 'white' : 'var(--on-surface-variant)' }}
                    >
                      Activas ({interlinks.filter(l => !hiddenKeys.includes(`mention:${l.name}`)).length})
                    </button>
                    <button 
                      onClick={() => setMentionTab('hidden')}
                      className="btn"
                      style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem', background: mentionTab === 'hidden' ? 'var(--primary)' : 'var(--surface-container)', color: mentionTab === 'hidden' ? 'white' : 'var(--on-surface-variant)' }}
                    >
                      Ocultas ({interlinks.filter(l => hiddenKeys.includes(`mention:${l.name}`)).length})
                    </button>
                  </div>
                </div>
                <button onClick={fetchInterlinks} className="btn" style={{ padding: '0.5rem 1rem', background: 'var(--surface-container-low)' }}>
                  Actualizar Lista
                </button>
              </div>

              {loading ? (
                <p>Analizando menciones...</p>
              ) : interlinks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--surface-container-lowest)', borderRadius: '1rem' }}>
                   <FileText size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                   <p>No se encontraron menciones.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--outline-variant)' }}>
                        <th style={{ padding: '1rem', color: 'var(--on-surface-variant)' }}>Nombre Interlink</th>
                        <th style={{ padding: '1rem', color: 'var(--on-surface-variant)' }}>Categoría Registrada</th>
                        <th style={{ padding: '1rem', color: 'var(--on-surface-variant)', textAlign: 'center' }}>Total Menciones</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Estado / Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interlinks
                        .filter(l => {
                          const isHidden = hiddenKeys.includes(`mention:${l.name}`);
                          return mentionTab === 'hidden' ? isHidden : !isHidden;
                        })
                        .map((link, i) => {
                          const itemKey = `mention:${link.name}`;
                          return (
                          <tr key={i} style={{ borderBottom: '1px solid var(--outline-variant)' }}>
                            <td style={{ padding: '1rem', fontWeight: 500, textTransform: 'capitalize' }}>
                              {link.name}
                            </td>
                            <td style={{ padding: '1rem' }}>
                              {link.existingType ? (
                                <span className="badge" style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'var(--surface-container-high)', border: '1px solid var(--outline-variant)' }}>
                                  {types.find(t => t.value === link.existingType)?.label || link.existingType}
                                </span>
                              ) : (
                                <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.85rem' }}>—</span>
                              )}
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                              {link.count}
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                              <button 
                                onClick={() => toggleHide(itemKey)} 
                                className="btn" 
                                style={{ padding: '0.4rem', color: 'var(--on-surface-variant)' }}
                                title={mentionTab === 'hidden' ? "Mostrar" : "Ocultar"}
                              >
                                {mentionTab === 'hidden' ? <Eye size={18} /> : <EyeOff size={18} />}
                              </button>

                              <select
                                id={`mention-type-${i}`}
                                defaultValue={link.type || 'meaning'}
                                style={{ 
                                  padding: '0.3rem', 
                                  borderRadius: '0.5rem', 
                                  background: 'var(--surface)', 
                                  border: '1px solid var(--outline-variant)',
                                  fontSize: '0.8rem'
                                }}
                              >
                                {types.filter(t => t.value !== 'dictionary_not_found').map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                              </select>
                              <button 
                                onClick={() => {
                                  const type = document.getElementById(`mention-type-${i}`).value;
                                  handleSendWebhook({ name: link.name, type });
                                }} 
                                className="btn btn-primary" 
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', gap: '0.3rem' }}
                                title="Enviar al Webhook (N8N)"
                              >
                                <Send size={14} /> Enviar
                              </button>
                              
                              {link.exists ? (() => {
                                const TYPE_PATHS = { 'my-name': 'nombre-en-coreano', 'saju': 'saju', 'meaning': 'significado-nombre-coreano' };
                                const path = TYPE_PATHS[link.existingType] || link.existingType;
                                return (
                                  <a
                                    href={`/${path}/${link.name.replace(/\s+/g, '-')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn"
                                    style={{ padding: '0.4rem', color: 'var(--on-surface-variant)' }}
                                    title="Ver en la web"
                                  >
                                    <ExternalLink size={16} />
                                  </a>
                                );
                              })() : (
                                <div style={{ width: '34px' }}></div>
                              )}
                              
                              <div 
                                style={{ 
                                  padding: '0.4rem 0.8rem',
                                  borderRadius: '0.5rem',
                                  background: link.exists ? '#4CAF50' : 'var(--surface-container-highest)', 
                                  color: link.exists ? '#FFFFFF' : '#9E9E9E',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                title={link.exists ? "Artículo ya existe" : "Artículo no existe"}
                              >
                                {link.exists ? <CheckCircle size={24} strokeWidth={2.5} /> : <XCircle size={24} />}
                              </div>
                            </td>
                          </tr>
                        )})}
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
                      {types.filter(t => t.value !== 'dictionary_not_found').map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
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
