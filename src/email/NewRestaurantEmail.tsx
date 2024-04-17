export const EmailTemplate = ({
  name,
  address,
  price,
  quality,
  seating_option,
  indoor_seating,
  outdoor_seating,
  take_away,
  vegan,
  website,
}: {
  name: string;
  address: string;
  price: string;
  quality: string;
  seating_option: boolean;
  indoor_seating: boolean;
  outdoor_seating: boolean;
  take_away: boolean;
  vegan: boolean;
  website: string;
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
      <h1>Neues Restaurant wurde Erstellt</h1>
      <ul>
        <li>Name: {name}</li>
        <li>Adresse: {address}</li>
        <li>Preis: {price}</li>
        <li>Qualit&auml;t: {quality}</li>
        <li>Sitzplatz Option: {seating_option ? "Ja" : "Nein"}</li>
        <li>Innen Sitzplatz: {indoor_seating ? "Ja" : "Nein"}</li>
        <li>Aussen Sitzplatz: {outdoor_seating ? "Ja" : "Nein"}</li>
        <li>Take Away: {take_away ? "Ja" : "Nein"}</li>
        <li>Vegan: {vegan ? "Ja" : "Nein"}</li>
        <li>Webseite: {website}</li>
      </ul>
      <p>
        Freundliche Gr&uuml;sse
        <br />
        Der Server
      </p>
    </div>
  </div>
);
