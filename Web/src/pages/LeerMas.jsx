import "../styles/LeerMas.css";

function LeerMas() {
  return (
    <div>
      {/* Sección 1 */}
      <div className="read-us-container">
        <div className="read-us full-text">
          <div className="content-read">
            <h3 className="heading-read">Situación problemática</h3>
            <p className="para-read">
              Existen tres grupos con diferentes necesidades de salud:
            </p>
            <ul className="para-read">
              <li>
                <b>Adultos mayores:</b> requieren control para prevenir
                problemas graves.
              </li>
              <li>
                <b>Adultos sanos:</b> se benefician del control preventivo para
                mejorar su calidad de vida.
              </li>
              <li>
                <b>Personas hospitalizadas:</b> necesitan seguimiento intensivo.
              </li>
            </ul>
            <p className="para-read">
              Por eso, surgió la idea de crear una pulsera que mida las
              constantes vitales.
            </p>
          </div>
          <img
            src={require("../img/braceletc.png")}
            className="img-read"
            alt="Persona enferma"
          />
        </div>
      </div>

      {/* Sección 2 */}
      <div className="read-us-container">
        <div className="read-us">
          <div className="content-read">
            <h3 className="heading-read">Beneficiarios</h3>
            <ol className="para-read">
              <li>
                <b>Adultos Mayores:</b> Personas que requieren un seguimiento
                constante de su salud.
              </li>
              <li>
                <b>Pacientes:</b> Personas en hospitales que necesitan un
                seguimiento continuo de sus signos vitales.
              </li>
              <li>
                <b>Personas en general:</b> Usuarios que desean prevenir
                problemas de salud o llevar un control detallado de su bienestar
                físico.
              </li>
            </ol>
          </div>
          <img
            src={require("../img/sick person.jpg")}
            className="img-read"
            alt="Persona enferma"
          />
        </div>
      </div>

      {/* Sección 3 */}
      <div className="read-us-container">
        <div className="read-us">
          <div className="content-read">
            <h3 className="heading-read">Soluciones</h3>
            <ol className="para-read">
              <li>
                <b>Dispositivo:</b> Pulsera portátil que mide signos vitales,
                configurable por el usuario.
              </li>
              <li>
                <b>App Móvil:</b> Visualización de datos en tiempo real por
                familiares, médicos o enfermeros.
              </li>
            </ol>
          </div>
          <img
            src={require("../img/interfG.jpg")}
            className="img-read"
            alt="Interfaz gráfica"
          />
        </div>
      </div>

      {/* Sección 4 */}
      <div className="read-us-container">
        <div className="read-us">
          <div className="content-read">
            <h3 className="heading-read">Objetivos</h3>
            <p className="para-read">
              <b>Prevenir y/o Advertir:</b> Infartos o problemas cardíacos,
              alertando al usuario o familiar.
            </p>
            <p className="para-read">
              <b>Proveer:</b> Acceso en tiempo real a los signos vitales, con
              monitoreo constante.
            </p>
          </div>
          <img
            src={require("../img/preven.webp")}
            className="img-read"
            alt="Prevención"
          />
        </div>
      </div>
    </div>
  );
}

export default LeerMas;
