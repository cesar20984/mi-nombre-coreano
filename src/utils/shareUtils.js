import html2canvas from 'html2canvas';

/**
 * Common utilities for sharing and copying content as professional cards.
 */

const generateCanvas = async (element, themeBg = '#ffffff') => {
  if (!element) return null;
  return await html2canvas(element, {
    scale: 3,
    backgroundColor: themeBg,
    useCORS: true,
    logging: false,
    onclone: (clonedDoc) => {
      // Find all branding elements in the cloned document and make them visible
      const brandings = clonedDoc.querySelectorAll('.capture-only');
      brandings.forEach(branding => {
        branding.style.opacity = '1';
      });
    }
  });
};


export const downloadAsImage = async (element, filename, bg) => {
  const canvas = await generateCanvas(element, bg);
  if (!canvas) return;
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = dataUrl;
  link.click();
};

export const copyAsImage = async (element, bg, setCopyStatus) => {
  setCopyStatus(true);
  try {
    if (window.ClipboardItem) {
      // Safari requires ClipboardItem to be created synchronously, wrapping a Promise.
      const makeImagePromise = new Promise(async (resolve) => {
        try {
          const canvas = await generateCanvas(element, bg);
          canvas.toBlob((blob) => resolve(blob));
        } catch (e) {
          console.error(e);
          resolve(null); // Resolve to prevent uncaught error breaking the clip API
        }
      });
      
      const item = new ClipboardItem({ "image/png": makeImagePromise });
      await navigator.clipboard.write([item]);
      setTimeout(() => setCopyStatus(false), 2000);
    } else {
      throw new Error("ClipboardItem not supported");
    }
  } catch (err) {
    console.error("Copy failed, attempting share fallback:", err);
    // Fallback to share for browsers/mobile environments that completely reject copying images
    try {
      const canvas = await generateCanvas(element, bg);
      if (canvas && navigator.share) {
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'koriname-share.png', { type: 'image/png' });
          await navigator.share({ title: 'Mi Nombre en Coreano', files: [file] });
        });
      } else {
        alert('Tu navegador no soporta la copia directa. Por favor, usa Descargar o Compartir.');
      }
    } catch(e) {}
    setCopyStatus(false);
  }
};

export const shareAsImage = async (element, bg, title, text, shareUrl) => {
  const url = shareUrl || window.location.origin;
  const canvas = await generateCanvas(element, bg);
  if (!canvas) return;

  canvas.toBlob(async (blob) => {
    if (!blob) return;
    const file = new File([blob], 'koriname-share.png', { type: 'image/png' });
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          files: [file],
          url: url
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} - Descubre más en ${url}`)}`;
      window.open(whatsappUrl, '_blank');
    }
  });
};

export const printAsImage = async (element, bg, title) => {
  const canvas = await generateCanvas(element, bg);
  if (!canvas) return;
  const dataUrl = canvas.toDataURL('image/png');
  const win = window.open('', '_blank');
  win.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fff; }
          img { max-width: 90%; height: auto; }
          @media print {
            body { height: auto; }
            img { max-width: 100%; width: 120mm; }
          }
        </style>
      </head>
      <body>
        <img src="${dataUrl}" id="print-img" />
        <script>
          window.onload = function() {
            // Pequeno delay para garantir que a imagem foi renderizada antes do painel de impressão
            setTimeout(function() {
              window.print();
              window.close();
            }, 500);
          }
        </script>
      </body>
    </html>
  `);
  win.document.close();
};
