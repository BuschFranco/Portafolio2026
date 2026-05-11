import type { Metadata } from "next";
import style from "../legal.module.css";

export const metadata: Metadata = {
  title: "Política de Privacidad | Busch Franco",
  description: "Información sobre el tratamiento de datos personales en este sitio.",
};

export default function PrivacidadPage() {
  return (
    <main className={style.page}>
      <a href="/" className={style.back}>← Volver al inicio</a>

      <h1 className={style.title}>Política de Privacidad</h1>
      <p className={style.updated}>Última actualización: abril 2026</p>

      <div className={style.section}>
        <h2>1. Responsable del sitio</h2>
        <p>
          Este sitio web es operado por <strong>Franco Busch</strong>, desarrollador de software
          independiente con base en Buenos Aires, Argentina. Ante cualquier consulta relacionada con
          el tratamiento de tus datos podés contactarme en{" "}
          <a href="mailto:francobusch130@gmail.com">francobusch130@gmail.com</a>.
        </p>
        <p>
          El tratamiento de datos personales se rige por la{" "}
          <strong>Ley N.° 25.326 de Protección de los Datos Personales</strong> de la República
          Argentina y su normativa complementaria.
        </p>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>2. Datos que recopilamos</h2>
        <p>Este sitio recopila dos tipos de información:</p>
        <ul>
          <li>
            <strong>Formulario de contacto:</strong> cuando completás el formulario se recopilan
            tu nombre, dirección de correo electrónico y el mensaje que enviás.
          </li>
          <li>
            <strong>Datos de navegación (analítica):</strong> a través de Google Analytics 4
            (gestionado mediante Google Tag Manager) se recopilan datos anonimizados sobre cómo
            los visitantes interactúan con el sitio (páginas vistas, tiempo de permanencia,
            dispositivo, país aproximado). No se recopilan datos personales identificables mediante
            analítica.
          </li>
        </ul>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>3. Finalidad y base legal del tratamiento</h2>
        <ul>
          <li>
            <strong>Formulario de contacto:</strong> los datos se usan exclusivamente para responder
            a tu consulta. Base legal: consentimiento del titular (art. 5 Ley 25.326 / art. 6.1.a
            GDPR).
          </li>
          <li>
            <strong>Analítica:</strong> los datos se usan para entender cómo se usa el sitio y
            mejorar su contenido y rendimiento. Base legal: interés legítimo del responsable /
            consentimiento previo para usuarios en la Unión Europea.
          </li>
        </ul>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>4. Almacenamiento y terceros</h2>
        <ul>
          <li>
            <strong>Formulario de contacto:</strong> los mensajes se almacenan en una base de
            datos de <strong>Notion</strong> (Notion Labs Inc., San Francisco, EE.UU.). Esta
            transferencia internacional implica el envío de datos a un país fuera de Argentina y de
            la Unión Europea. Podés consultar la política de privacidad de Notion en{" "}
            <a href="https://www.notion.so/privacy" target="_blank" rel="noopener noreferrer">
              notion.so/privacy
            </a>
            .
          </li>
          <li>
            <strong>Google Analytics / Tag Manager:</strong> los datos de navegación se procesan
            en servidores de Google LLC. Para más información consultá la{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              política de privacidad de Google
            </a>
            .
          </li>
        </ul>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>5. Cookies</h2>
        <p>
          Este sitio usa cookies de Google Analytics para analítica de uso. No se usan cookies
          publicitarias ni de seguimiento entre sitios.
        </p>
        <p>
          Si tu zona horaria corresponde a la Unión Europea, el sitio te solicitará consentimiento
          antes de activar las cookies analíticas. En el resto del mundo, las cookies de analítica
          se activan automáticamente dado que procesan únicamente datos anonimizados.
        </p>
        <p>
          Podés desactivar las cookies de Google Analytics instalando el complemento oficial:{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            tools.google.com/dlpage/gaoptout
          </a>
          .
        </p>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>6. Conservación de los datos</h2>
        <p>
          Los mensajes del formulario se conservan mientras sean necesarios para gestionar tu
          consulta. Podés solicitar la eliminación de tus datos en cualquier momento escribiendo a{" "}
          <a href="mailto:francobusch130@gmail.com">francobusch130@gmail.com</a>.
        </p>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>7. Tus derechos</h2>
        <p>
          De acuerdo con la Ley 25.326 (Argentina) y, para usuarios de la Unión Europea, el
          Reglamento General de Protección de Datos (RGPD / GDPR), tenés derecho a:
        </p>
        <ul>
          <li>Acceder a los datos personales que tenemos sobre vos.</li>
          <li>Solicitar su rectificación o eliminación.</li>
          <li>Oponerte al tratamiento de tus datos.</li>
          <li>Solicitar la portabilidad de tus datos (usuarios UE).</li>
          <li>Retirar tu consentimiento en cualquier momento, sin que ello afecte la licitud del tratamiento previo.</li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos escribí a{" "}
          <a href="mailto:francobusch130@gmail.com">francobusch130@gmail.com</a>.
        </p>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>8. Cambios en esta política</h2>
        <p>
          Esta política puede actualizarse ocasionalmente. La fecha de última actualización
          aparece al inicio de esta página.
        </p>
      </div>
    </main>
  );
}
