export async function sendUserData({ nombre, prefijo, telefono, codigo, email, aliado }) {
  const params = new URLSearchParams();
  params.append('nombre', nombre);
  params.append('prefijo', prefijo);
  params.append('telefono', telefono);
  params.append('codigo', codigo);

  
  if (email) {
    params.append('email', email);
  }

  // Aliado: puede ser 'NA' o 'no'
  params.append('aliado', aliado);

  // Siempre se debe enviar 'cerrar_sesiones' como 'on'
  params.append('cerrar_sesiones', 'on');

  const response = await fetch('https://wa.toolia.site/add_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error en el registro');
  }

  const data = await response.text();
  return data;
}
