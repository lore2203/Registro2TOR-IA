import './RegisterForm.css'; 
import robotImage from '../assets/Yarmis.2.png'; 
import logoImage from '../assets/Logo-2.png';
import textoImage from '../assets/Texto-1.png';
import { useState } from 'react';
import { sendUserData } from '../services/api';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    prefijo: '',
    telefono: '',
    codigo: '',
    email: '',
    aliado: 'NA',
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const cursos = [
    { nombre: 'Manipulación de alimentos', codigo: 'alimentos' },
    { nombre: 'Tips de IA generativa', codigo: 'tips-ia' },
  ];

  const longitudPorGrupo = {
    10: ['+1', '+52', '+55', '+57', '+56', '+58', '+51', '+53', '+54', '+591', '+506', '+507', '+598', '+98', '+964', '+962', '+961', '+965', '+971', '+968', '+974', '+973', '+967'],
    9: ['+34', '+49', '+33', '+39', '+44', '+7', '+380', '+48', '+40', '+31', '+32', '+30', '+351', '+46', '+47', '+61', '+64', '+679', '+675', '+676'],
    11: ['+86', '+91', '+81', '+82', '+62', '+90', '+63', '+66', '+84', '+972', '+60', '+65', '+92', '+880', '+966'],
    8: ['+20', '+27', '+234', '+254', '+212', '+213', '+256', '+233', '+237', '+225', '+221', '+255', '+249', '+218', '+216'],
  };

  const prefijoLongitud = {};
  Object.entries(longitudPorGrupo).forEach(([longitud, prefijos]) => {
    prefijos.forEach((prefijo) => {
      prefijoLongitud[prefijo] = parseInt(longitud);
    });
  });

  const prefijosPorRegion = {
  América: [
    ['Estados Unidos', '+1'],
    ['Canadá', '+1'],
    ['México', '+52'],
    ['Brasil', '+55'],
    ['Argentina', '+54'],
    ['Colombia', '+57'],
    ['Chile', '+56'],
    ['Venezuela', '+58'],
    ['Perú', '+51'],
    ['Ecuador', '+593'],
    ['Cuba', '+53'],
    ['Bolivia', '+591'],
    ['Costa Rica', '+506'],
    ['Panamá', '+507'],
    ['Uruguay', '+598'],
  ],
  Europa: [
    ['España', '+34'],
    ['Alemania', '+49'],
    ['Francia', '+33'],
    ['Italia', '+39'],
    ['Reino Unido', '+44'],
    ['Rusia', '+7'],
    ['Ucrania', '+380'],
    ['Polonia', '+48'],
    ['Rumania', '+40'],
    ['Países Bajos', '+31'],
    ['Bélgica', '+32'],
    ['Grecia', '+30'],
    ['Portugal', '+351'],
    ['Suecia', '+46'],
    ['Noruega', '+47'],
  ],
  Asia: [
    ['China', '+86'],
    ['India', '+91'],
    ['Japón', '+81'],
    ['Corea del Sur', '+82'],
    ['Indonesia', '+62'],
    ['Turquía', '+90'],
    ['Filipinas', '+63'],
    ['Tailandia', '+66'],
    ['Vietnam', '+84'],
    ['Israel', '+972'],
    ['Malasia', '+60'],
    ['Singapur', '+65'],
    ['Pakistán', '+92'],
    ['Bangladés', '+880'],
    ['Arabia Saudita', '+966'],
  ],
  África: [
    ['Egipto', '+20'],
    ['Sudáfrica', '+27'],
    ['Nigeria', '+234'],
    ['Kenia', '+254'],
    ['Marruecos', '+212'],
    ['Argelia', '+213'],
    ['Uganda', '+256'],
    ['Ghana', '+233'],
    ['Camerún', '+237'],
    ['Costa de Marfil', '+225'],
    ['Senegal', '+221'],
    ['Tanzania', '+255'],
    ['Sudán', '+249'],
    ['Libia', '+218'],
    ['Túnez', '+216'],
  ],
  Oceanía: [
    ['Australia', '+61'],
    ['Nueva Zelanda', '+64'],
    ['Fiyi', '+679'],
    ['Papúa Nueva Guinea', '+675'],
    ['Tonga', '+676'],
  ],
  'Medio Oriente': [
    ['Irán', '+98'],
    ['Iraq', '+964'],
    ['Jordania', '+962'],
    ['Líbano', '+961'],
    ['Kuwait', '+965'],
    ['Emiratos Árabes Unidos', '+971'],
    ['Omán', '+968'],
    ['Catar', '+974'],
    ['Bahrein', '+973'],
    ['Yemen', '+967'],
  ],
};
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nombre' && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/.test(value)) return;
    if (name === 'telefono' && !/^[0-9]{0,15}$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    const { nombre, prefijo, telefono, codigo, email } = formData;

    if (!nombre || !prefijo || !telefono || !codigo) {
      setError('Todos los campos obligatorios deben estar completos.');
      return;
    }

    if (email && !/^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setError('El correo electrónico no es válido.');
      return;
    }

    const longitudEsperada = prefijoLongitud[prefijo];
    if (!longitudEsperada) {
      setError(`Prefijo no reconocido: ${prefijo}`);
      return;
    }

    if (telefono.length !== longitudEsperada) {
      setError(`Para el prefijo ${prefijo}, el número debe tener ${longitudEsperada} dígitos.`);
      return;
    }

    try {
      const response = await sendUserData(formData);
      setMensaje(response);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <header className="header-bar">
        <img src={logoImage} alt="Logo cerebro" className="header-logo" />
        <img src={textoImage} alt="Texto Business Support" className="header-texto" />
        <h1 className="header-titulo">2Tor-IA</h1>
      </header>

      <div className="full-page">
        <div className="robot-container">
          <img src={robotImage} alt="Robot asistente" />
        </div>
        <form className="form-section" onSubmit={handleSubmit}>
          <h2>Registro en 2Tor-IA</h2>

          <div className="input-wrapper">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder=" "
              required
              autoComplete="off"
            />
            <label className="floating-label">Nombre</label>
          </div>

          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              autoComplete="off"
            />
            <label className="floating-label">Correo electrónico (opcional)</label>
          </div>

          <div className="dual-fields">
            <div className="input-wrapper">
              <select name="prefijo" value={formData.prefijo} onChange={handleChange} required>
                <option value="" disabled hidden></option>
                {Object.entries(prefijosPorRegion).map(([region, paises]) => (
                  <optgroup key={region} label={region}>
                    {paises.map(([pais, codigo]) => (
                      <option key={codigo} value={codigo}>
                        {pais} ({codigo})
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <label className="floating-label">Prefijo</label>
            </div>

            <div className="input-wrapper">
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder=" "
                required
                autoComplete="off"
              />
              <label className="floating-label">Teléfono</label>
            </div>
          </div>

          <div className="input-wrapper">
            <select name="codigo" value={formData.codigo} onChange={handleChange} required>
              <option value="" disabled hidden></option>
              {cursos.map((curso) => (
                <option key={curso.codigo} value={curso.codigo}>
                  {curso.nombre}
                </option>
              ))}
            </select>
            <label className="floating-label">Curso</label>
          </div>

          <div className="input-wrapper">
            <select name="aliado" value={formData.aliado} onChange={handleChange} required>
              <option value="NA">Sí</option>
              <option value="no">No</option>
            </select>
            <label className="floating-label">¿Eres aliado/a?</label>
          </div>

          <button type="submit">ENVIAR</button>
          {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
