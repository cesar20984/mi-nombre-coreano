import { useState } from 'react';
import SEO from '../components/SEO';

export default function Admin() {
  const [formData, setFormData] = useState({
    name: '',
    type: 'my-name',
    content: '',
    password: ''
  });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const types = [
    { value: 'my-name', label: 'Transliteración' },
    { value: 'saju', label: 'Saju (Fecha de Nacimiento)' },
    { value: 'meaning', label: 'Significado Clásico' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${formData.password}`
        },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          content: formData.content
        })
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ loading: false, message: '¡Artículo guardado exitosamente!', type: 'success' });
        // Opcional: limpiar form
        // setFormData({ ...formData, name: '', content: '' });
      } else {
        setStatus({ loading: false, message: `Error: ${data.error}`, type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, message: 'Error de red al intentar guardar.', type: 'error' });
    }
  };

  return (
    <>
      <SEO title="Dashboard de Administración | Koriname" description="Panel de control interno." />
      <section className="section" style={{ minHeight: '80vh', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
          
          <div className="text-center mb-8">
            <h1 className="display-sm mb-2">Editor de Artículos</h1>
            <p className="body-md" style={{ color: 'var(--on-surface-variant)' }}>
              Crea contenido dinámico para las páginas compartidas.
            </p>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div>
                <label className="body-sm" style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Contraseña de Admin</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--outline-variant)', background: 'var(--surface-container)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <label className="body-sm" style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Nombre (Normalizado ej. "cesar")</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--outline-variant)', background: 'var(--surface-container)' }}
                  />
                </div>
                
                <div style={{ flex: '1 1 200px' }}>
                  <label className="body-sm" style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Tipo de Generador</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--outline-variant)', background: 'var(--surface-container)' }}
                  >
                    {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="body-sm" style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Contenido (HTML permitido)</label>
                <textarea 
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows="10"
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--outline-variant)', background: 'var(--surface-container)', resize: 'vertical', fontFamily: 'monospace' }}
                  placeholder="<h2>Significado especial</h2><p>El nombre de César en Corea tiene un gran trasfondo...</p>"
                ></textarea>
              </div>

              {status.message && (
                <div style={{ padding: '1rem', borderRadius: '8px', background: status.type === 'error' ? '#ffebee' : '#e8f5e9', color: status.type === 'error' ? '#c62828' : '#2e7d32' }}>
                  {status.message}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={status.loading}
                style={{ alignSelf: 'flex-start', padding: '0.8rem 2rem' }}
              >
                {status.loading ? 'Guardando...' : 'Guardar Artículo'}
              </button>

            </form>
          </div>
          
        </div>
      </section>
    </>
  );
}
