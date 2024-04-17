export const EmailTemplate = ({
  name,
  link,
}: {
  name: string;
  link: string;
}) => (
  <div
    style={{
      width: "100%",
      height: "1500px",
      background:
        "linear-gradient(90deg, rgba(0,38,96,1) 0%, rgba(147,230,199,1) 50%, rgba(6,142,186,1) 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        backgroundColor: "#000000CB",
        color: "white",
        padding: "20px",
        margin: "auto",
        marginTop: "20px",
        borderRadius: "10px",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Passwort zurücksetzen</h1>
      <p>
        Hallo {name},
        <br />
        Du hast auf unserer seite angefordert dein Passwort zu ändern.
      </p>
      <a
        href={link}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0BCAAD",
          color: "black",
          borderRadius: "5px",
          textDecoration: "none",
          margin: "20px 0",
          display: "inline-block",
        }}
      >
        Passwort zurücksetzen
      </a>
      <p>
        Freundliche Gr&uuml;sse
        <br />
        Das Lunch Guide Team
      </p>
    </div>
  </div>
);
