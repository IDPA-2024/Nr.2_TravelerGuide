import React from 'react';

const Datenschutzrichtlinie = () => {
  return (
    <div className="bg-bg bg-cover h-screen w-screen flex justify-center items-center md:justify-center p-10 overflow-hidden">
      <div className=" overflow-y-scroll flex flex-col gap-20 md:gap-10 justify-center text-start w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:m-10 md:w-2/3 p-10">
        <h1 className="text-3xl font-bold mb-4">Datenschutzrichtlinie</h1>
        <p className="mb-4">
          Diese Datenschutzrichtlinie beschreibt, wie BLS YEA, mit Sitz in Rosenstrasse 1, 8400 Winterthur, ("wir", "uns" oder "unser") Informationen sammelt, verwendet und schützt, wenn Sie unsere Website unter <a className="text-blue-500 hover:underline" href="https://www.lunch-guide.ch">https://www.lunch-guide.ch</a> besuchen oder unsere Dienste nutzen. Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und halten uns an alle geltenden Datenschutzgesetze.
        </p>
        <h2 className="text-2xl font-bold mb-2">Arten von gesammelten Daten</h2>
        <p className="mb-4">
          Wir erfassen nur Informationen, die Sie freiwillig bereitstellen, einschließlich:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Vorname</li>
          <li>Nachname</li>
          <li>E-Mail-Adresse</li>
        </ul>
        <h2 className="text-2xl font-bold mb-2">Verwendung Ihrer Daten</h2>
        <p className="mb-4">
          Wir verwenden die von Ihnen bereitgestellten Daten nur, um:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Ihnen relevante Informationen und Updates über unsere Dienste zuzusenden</li>
          <li>Ihre Anfragen zu bearbeiten und Ihre Fragen zu beantworten</li>
          <li>Unseren Service zu verbessern und auf Ihre Bedürfnisse anzupassen</li>
        </ul>
        <h2 className="text-2xl font-bold mb-2">Zustimmung zu den Nutzungsbedingungen</h2>
        <p className="mb-4">
          Durch die Nutzung der Website erklären Sie sich damit einverstanden, diese Nutzungsbedingungen vollständig zu akzeptieren. Wenn Sie mit diesen Nutzungsbedingungen nicht einverstanden sind, nutzen Sie bitte unsere Website nicht.
        </p>
        <h2 className="text-2xl font-bold mb-2">Ausschluss von Nutzern</h2>
        <p className="mb-2">
          Wir behalten uns das Recht vor, Nutzer von der Nutzung der Website auszuschließen, wenn sie gegen diese Nutzungsbedingungen verstoßen oder anderweitig unangemessenes Verhalten zeigen. Dies kann insbesondere dann der Fall sein, wenn ein Nutzer:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Unangemessene oder beleidigende Inhalte veröffentlicht</strong> oder anderweitig gegen die Community-Richtlinien verstößt.</li>
          <li><strong>Absichtlich falsche oder irreführende Informationen verbreitet.</strong></li>
          <li><strong>Die Rechte anderer Nutzer verletzt oder anderweitig gegen geltendes Recht verstößt.</strong></li>
        </ul>
        <p className="mb-4">
          Wir möchten betonen, dass wir keine Beleidigungen auf unserer Website dulden. Darüber hinaus sollten Nutzer keine absichtlich falschen Informationen über Restaurants verbreiten, da dies unsere Arbeit erschwert und zu einer schlechteren Erfahrung für alle Nutzer führt.
        </p>
        <p className="mb-4">
          Ein solcher Ausschluss bedeutet, dass der betreffende Nutzer sich nicht mehr anmelden kann und somit keine Restaurants mehr hinzufügen oder bearbeiten kann. Dieser Ausschluss kann vorübergehend oder dauerhaft sein und liegt im alleinigen Ermessen von BLS YEA.
        </p>
        <h2 className="text-2xl font-bold mb-2">Änderungen an den Nutzungsbedingungen</h2>
        <p className="mb-4">
          Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern oder zu aktualisieren. Es liegt in Ihrer Verantwortung, regelmäßig auf Änderungen dieser Nutzungsbedingungen zu achten. Die Fortsetzung der Nutzung der Website nach der Veröffentlichung von Änderungen bedeutet, dass Sie diese Änderungen akzeptieren.
        </p>
        <h2 className="text-2xl font-bold mb-2">Cookies</h2>
        <p className="mb-4">
          Wir verwenden keine Cookies auf unserer Website.
        </p>
        <h2 className="text-2xl font-bold mb-2">Datenschutz von Kindern</h2>
        <p className="mb-4">
          Unsere Dienste richten sich nicht an Personen unter 13 Jahren, und wir sammeln nicht wissentlich personenbezogene Daten von Kindern unter 13 Jahren.
          Ausserdem, solange sich Nutzer nicht anmelden, sammeln wir keine personenbezogenen Daten.
        </p>
        <h2 className="text-2xl font-bold mb-2">Kontaktieren Sie uns</h2>
        <p>
          Wenn Sie Fragen oder Bedenken bezüglich dieser Datenschutzrichtlinie haben, können Sie uns unter <a className="text-blue-500 hover:underline" href="mailto:Ael.banyard@gmail.com">Ael.banyard@gmail.com</a> kontaktieren.
        </p>
      </div>
    </div>
  );
};

export default Datenschutzrichtlinie;
