import type { Metadata } from "next";
import style from "../legal.module.css";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Busch Franco",
  description: "Condiciones de uso del sitio web de Franco Busch.",
};

export default function TerminosPage() {
  return (
    <main className={style.page}>
      <a href="/" className={style.back}>← Volver al inicio</a>

      <h1 className={style.title}>Términos y Condiciones</h1>
      <p className={style.updated}>Última actualización: abril 2026</p>

      <div className={style.section}>
        <h2>1. Aceptación</h2>
        <p>
          Al acceder y usar este sitio web aceptás los presentes términos. Si no estás de acuerdo,
          por favor no uses el sitio.
        </p>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>2. Descripción del sitio</h2>
        <p>
          Este sitio es el portafolio profesional de <strong>Franco Busch</strong>, desarrollador
          de software independiente. Su propósito es presentar trabajos, habilidades y facilitar
          el contacto con potenciales clientes o empleadores.
        </p>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>3. Uso permitido</h2>
        <p>El sitio puede utilizarse para:</p>
        <ul>
          <li>Conocer los trabajos y servicios ofrecidos.</li>
          <li>Enviar consultas a través del formulario de contacto.</li>
          <li>Descargar el currículum vitae disponible públicamente.</li>
        </ul>
        <p>Queda prohibido:</p>
        <ul>
          <li>Reproducir, copiar o distribuir el contenido del sitio sin autorización.</li>
          <li>Usar el sitio para fines ilícitos o que perjudiquen a terceros.</li>
          <li>Intentar acceder sin autorización a los sistemas del sitio.</li>
        </ul>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>4. Propiedad intelectual</h2>
        <p>
          Todo el contenido de este sitio (textos, imágenes, código, diseño) es propiedad de
          Franco Busch o de sus respectivos autores, y está protegido por las leyes de propiedad
          intelectual aplicables. Los proyectos de terceros referenciados en el portafolio son
          propiedad de sus respectivos dueños.
        </p>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>5. Servicios e información</h2>
        <p>
          La información presentada en este sitio tiene carácter informativo. Los proyectos
          mostrados son trabajos realizados y no constituyen una garantía de resultados futuros.
          Para contratar servicios, toda condición específica deberá acordarse por separado.
        </p>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>6. Limitación de responsabilidad</h2>
        <p>
          Franco Busch no se responsabiliza por daños directos o indirectos derivados del uso de
          este sitio, de la información contenida en él, ni de los sitios de terceros enlazados.
          El sitio se provee "tal cual" sin garantías de ningún tipo.
        </p>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>7. Modificaciones</h2>
        <p>
          Estos términos pueden modificarse en cualquier momento. La fecha de última actualización
          aparece al inicio de esta página. El uso continuado del sitio implica aceptación de los
          términos vigentes.
        </p>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>8. Ley aplicable</h2>
        <p>
          Estos términos se rigen por las leyes de la República Argentina. Ante cualquier
          controversia serán competentes los tribunales ordinarios de la Ciudad Autónoma de Buenos
          Aires.
        </p>
      </div>

      <hr className={style.divider} />

      <div className={style.section}>
        <h2>9. Contacto</h2>
        <p>
          Consultas sobre estos términos:{" "}
          <a href="mailto:francobusch130@gmail.com">francobusch130@gmail.com</a>.
        </p>
      </div>
    </main>
  );
}
