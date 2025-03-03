import React from "react";
import "../styles/Home.css";

const Card = ({ title, description, icon }) => {
  return (
    <div className="card">
      <div className="icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

const Features = () => {
  const services = [
    {
      title: "Išmanioji CV analizė",
      description:
        "Automatiškai nuskaito ir analizuoja CV turinį (įgūdžius, patirtį, išsilavinimą). Atpažįsta trūkstamus įgūdžius, kurie reikalingi tavo sričiai. Pateikia personalizuotas rekomendacijas CV patobulinimui.",
      icon: "📄"
    },
    {
      title: "GitHub įgūdžių atpažinimas",
      description:
        "Nuskaito ir analizuoja GitHub profilio projektus. Nustato, kokius programavimo įgūdžius iš tikrųjų naudoji. Palygina su CV informacija ir siūlo, kaip pagerinti CV.",
      icon: "💻"
    },
    {
      title: "Karjeros kelio nustatymas",
      description:
        "AI analizuoja tavo CV ir GitHub, kad nustatytų 5 ryškiausias karjeros kryptis. Grafinė diagrama parodo, kurios sritys tau tinkamiausios. Palyginama su rinkos tendencijomis, kad gautum geriausias įsidarbinimo galimybes.",
      icon: "📊"
    },
    {
      title: "Testai tavo įgūdžiams įvertinti",
      description:
        "Kiekvienai karjeros krypčiai - testas su 10 klausimų. AI padeda suprasti, kuriuos įgūdžius verta tobulinti. Rezultatai pateikiami grafiškai, kad būtų aišku, kur tau sekasi geriausiai.",
      icon: "📝"
    },
    {
      title: "Individualios mokymosi rekomendacijos",
      description:
        "AI parenka tau tinkamiausius kursus, video pamokas ir LeetCode užduotis. Siūlomos interaktyvios užduotys, padedančios lavinti trūkstamus įgūdžius. Tikslas - padėti greičiau įgyti darbui reikalingų kompetencijų.",
      icon: "📚"
    },
    {
      title: "Darbo pasiūlymai pagal tavo profilį",
      description:
        "AI palygina tavo įgūdžius su darbų rinkos poreikiais. Pateikia asmeninius darbo pasiūlymus pagal tavo stipriausias sritis. Siūlomi patarimai, kaip pritaikyti savo CV ir pasiruošti pokalbiams.",
      icon: "🏢"
    }
  ];

  return (
    <div className="container">
      <h1>Kaip galime padėti?</h1>
      <div class="grid-wrapper">
      <div className="grid">
        {services.map((service, index) => (
          <Card key={index} title={service.title} description={service.description} icon={service.icon} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default Features;

