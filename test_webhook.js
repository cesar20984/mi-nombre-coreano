fetch('https://n8n-n8n.b92vmw.easypanel.host/webhook/koriname-api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'test',
    type: 'my-name'
  })
}).then(res => {
  console.log('Status:', res.status);
  return res.text();
}).then(text => {
  console.log('Body:', text);
}).catch(console.error);
