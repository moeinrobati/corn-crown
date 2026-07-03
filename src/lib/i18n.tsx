"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { enProducts } from "./translations/en-products";
import { enRecipes } from "./translations/en-recipes";
import { deProducts } from "./translations/de-products";
import { deRecipes } from "./translations/de-recipes";
import { faProducts } from "./translations/fa-products";
import { faRecipes } from "./translations/fa-recipes";
import { esProducts } from "./translations/es-products";
import { esRecipes } from "./translations/es-recipes";
import { enRecipeContent } from "./translations/en-recipe-content";
import { deRecipeContent } from "./translations/de-recipe-content";
import { faRecipeContent } from "./translations/fa-recipe-content";
import { esRecipeContent } from "./translations/es-recipe-content";

type LangCode = "en" | "de" | "fa" | "es";

interface Language {
  code: LangCode;
  name: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "fa", name: "فارسی", flag: "🇮🇷", dir: "rtl" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
];

export const translations: Record<LangCode, Record<string, string>> = {
  en: {
    // Navbar
    home: "Home",
    shop: "Shop",
    recipes: "Recipes",
    about: "About",
    contact: "Contact",
    shopNow: "Shop Now",
    premiumCorn: "Premium Corn",
    // Hero
    heroTitle: "Corn Crown",
    heroSubtitle: "Premium Corn, Harvested with Pride",
    heroDesc: "From our sun-kissed fields to your table, every kernel tells a story of tradition, quality, and the relentless pursuit of perfection.",
    ourStory: "Our Story",
    // Featured Products
    ourSelection: "Our Selection",
    featuredHarvest: "Featured Harvest",
    featuredDesc: "Discover our most beloved corn products, each one a testament to generations of farming expertise and the rich soil of our heritage fields.",
    viewAllProducts: "View All Products",
    // About Preview
    ourHeritage: "Our Heritage",
    fromFieldTo: "From Field to",
    familyTable: "Family Table",
    aboutDesc1: "For three generations, the Crown family has cultivated the finest corn in the heartland. What started as a small family farm has grown into a commitment to bring nature's golden treasure directly to your kitchen.",
    aboutDesc2: "Every kernel is nurtured with care, harvested at peak perfection, and delivered with the same pride that has defined our family since 1987.",
    discoverOurStory: "Discover Our Story",
    visitOurFarm: "Visit Our Farm",
    // Newsletter
    stayConnected: "Stay Connected",
    joinTheHarvest: "Join the Harvest",
    newsletterDesc: "Subscribe to receive updates on seasonal harvests, exclusive recipes, and special offers directly from our farm.",
    enterYourEmail: "Enter your email",
    subscribe: "Subscribe",
    noSpam: "No spam, just the good stuff. Unsubscribe anytime.",
    // Products page
    ourProducts: "Our Products",
    productsDesc: "Explore our curated collection of premium corn products, each one carefully selected and harvested at peak perfection.",
    all: "All",
    sweetCorn: "Sweet Corn",
    popcorn: "Popcorn",
    cornFlour: "Corn Flour",
    specialty: "Specialty",
    oils: "Oils",
    tea: "Tea",
    // Product detail
    backToProducts: "Back to Products",
    quantity: "Quantity",
    total: "total",
    addToCart: "Add to Cart",
    organic: "100% Organic",
    freeShipping: "Free Shipping",
    premiumQuality: "Premium Quality",
    easyReturns: "Easy Returns",
    youMightAlsoLike: "You Might Also Like",
    // About page
    ourStoryTitle: "Our Story",
    storySubtitle: "Three generations of passion, tradition, and the relentless pursuit of the perfect kernel.",
    fromSmallFarm: "From a Small Farm to Your",
    farmDesc1: "What began as a 10-acre plot tended by James Crown in 1987 has blossomed into a legacy of agricultural excellence. Today, Corn Crown spans over 200 acres of prime farmland, where we continue to grow corn with the same care and dedication that defined our very first harvest.",
    farmDesc2: "Our commitment goes beyond just growing corn. We're custodians of the land, preserving traditional farming methods while embracing sustainable practices that ensure our fields will flourish for generations to come.",
    milestones: "Milestones & Memories",
    ourCoreValues: "Our Core Values",
    tasteTheDifference: "Taste the Difference",
    tasteDesc: "Ready to experience corn the way nature intended? Browse our selection and bring the harvest home.",
    // Contact
    getInTouch: "Get in",
    touch: "Touch",
    contactDesc: "Have questions about our products? Want to schedule a farm visit? We'd love to hear from you.",
    sendMessage: "Send Us a Message",
    name: "Name",
    yourName: "Your name",
    email: "Email",
    subject: "Subject",
    whatIsThisAbout: "What's this about?",
    message: "Message",
    tellUsWhatYouNeed: "Tell us what you need...",
    thankYouMessage: "Thank you for your message! We'll get back to you soon.",
    visitOurFarmTitle: "Visit Our Farm",
    callUs: "Call Us",
    emailUs: "Email Us",
    farmStoreHours: "Farm Store Hours",
    // Footer
    fromFieldToTable: "From our fields to your table, delivering nature's golden treasures since 1987.",
    products: "Products",
    company: "Company",
    support: "Support",
    helpCenter: "Help Center",
    shippingInfo: "Shipping Info",
    returns: "Returns",
    wholesale: "Wholesale",
    ourStoryLink: "Our Story",
    sustainability: "Sustainability",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    allRightsReserved: "All rights reserved.",
    // Values
    qualityFirst: "Quality First",
    qualityDesc: "Every kernel is hand-selected and inspected to meet our exacting standards before reaching your table.",
    sustainabilityTitle: "Sustainability",
    sustainabilityDesc: "We practice regenerative agriculture, nurturing the soil for future generations while growing the finest corn.",
    heritage: "Heritage",
    heritageDesc: "Three generations of farming wisdom, combining traditional methods with modern sustainable practices.",
    community: "Community",
    communityDesc: "Supporting local farmers and communities, creating jobs, and sharing the bounty of our harvest.",
    // Timeline
    theBeginning: "The Beginning",
    theBeginningDesc: "James Crown plants his first corn field on 10 acres of rich farmland in the heartland.",
    growingHeritage: "Growing Heritage",
    growingHeritageDesc: "The farm expands to 50 acres, introducing heritage corn varieties passed down through generations.",
    organicCertification: "Organic Certification",
    organicCertificationDesc: "Corn Crown receives organic certification, committing to sustainable and natural farming practices.",
    directToTable: "Direct to Table",
    directToTableDesc: "Launch of the Corn Crown brand, bringing farm-fresh corn products directly to families nationwide.",
    digitalHarvest: "Digital Harvest",
    digitalHarvestDesc: "Opening our online store to share nature's golden treasures with corn lovers everywhere.",
    noProductsFound: "No products found in this category.",
    specifications: "Specifications",
    ...enProducts,
    ...enRecipes,
    ...enRecipeContent,
  },
  de: {
    // Navbar
    home: "Startseite",
    shop: "Shop",
    recipes: "Rezepte",
    about: "Über uns",
    contact: "Kontakt",
    shopNow: "Jetzt kaufen",
    premiumCorn: "Premium Mais",
    // Hero
    heroTitle: "Corn Crown",
    heroSubtitle: "Premium Mais, mit Stolz geerntet",
    heroDesc: "Von unseren sonnenverwöhnten Feldern bis zu Ihrem Tisch erzählt jedes Korn eine Geschichte von Tradition, Qualität und dem unermüdlichen Streben nach Perfektion.",
    ourStory: "Unsere Geschichte",
    // Featured Products
    ourSelection: "Unsere Auswahl",
    featuredHarvest: "Erntehighlights",
    featuredDesc: "Entdecken Sie unsere beliebtesten Maisprodukte – jedes ein Zeugnis von Generationen landwirtschaftlicher Expertise.",
    viewAllProducts: "Alle Produkte ansehen",
    // About Preview
    ourHeritage: "Unser Erbe",
    fromFieldTo: "Vom Feld zum",
    familyTable: "Familientisch",
    aboutDesc1: "Seit drei Generationen baut die Familie Crown den besten Mais im Herzen des Landes an.",
    aboutDesc2: "Jedes Korn wird mit Sorge gepflegt, in Perfektion geerntet und mit dem gleichen Stolz geliefert, der unsere Familie seit 1987 prägt.",
    discoverOurStory: "Unsere Geschichte entdecken",
    visitOurFarm: "Unseren Hof besuchen",
    // Newsletter
    stayConnected: "Verbunden bleiben",
    joinTheHarvest: "Werden Sie Teil der Ernte",
    newsletterDesc: "Abonnieren Sie Updates zu Saisonernten, exklusiven Rezepten und Sonderangeboten direkt von unserem Hof.",
    enterYourEmail: "Ihre E-Mail eingeben",
    subscribe: "Abonnieren",
    noSpam: "Kein Spam, nur das Gute. Jederzeit abbestellbar.",
    // Products page
    ourProducts: "Unsere Produkte",
    productsDesc: "Entdecken Sie unsere kuratierte Kollektion von Premium-Maisprodukten.",
    all: "Alle",
    sweetCorn: "Süßer Mais",
    popcorn: "Popcorn",
    cornFlour: "Mehl",
    specialty: "Spezialitäten",
    oils: "Öle",
    tea: "Tee",
    // Product detail
    backToProducts: "Zurück zu den Produkten",
    quantity: "Menge",
    total: "Gesamt",
    addToCart: "In den Warenkorb",
    organic: "100% Bio",
    freeShipping: "Kostenloser Versand",
    premiumQuality: "Premium Qualität",
    easyReturns: "Einfache Rückgabe",
    youMightAlsoLike: "Das könnte Ihnen auch gefallen",
    // About page
    ourStoryTitle: "Unsere Geschichte",
    storySubtitle: "Drei Generationen Leidenschaft, Tradition und dem Streben nach dem perfekten Korn.",
    fromSmallFarm: "Vom kleinen Bauernhof zu Ihrem",
    farmDesc1: "Was 1987 als ein 10-Morgen-Grundstück begann, ist zu einem Erbe landwirtschaftlicher Exzellenz geworden.",
    farmDesc2: "Unser Engagement geht über den Maisanbau hinaus. Wir sind Hüter des Landes.",
    milestones: "Meilensteine & Erinnerungen",
    ourCoreValues: "Unsere Grundwerte",
    tasteTheDifference: "Schmecken Sie den Unterschied",
    tasteDesc: "Bereit, Mais so zu erleben, wie es die Natur vorgesehen hat?",
    // Contact
    getInTouch: "Kontakt",
    touch: "aufnehmen",
    contactDesc: "Haben Sie Fragen zu unseren Produkten? Wir freuen uns von Ihnen zu hören.",
    sendMessage: "Nachricht senden",
    name: "Name",
    yourName: "Ihr Name",
    email: "E-Mail",
    subject: "Betreff",
    whatIsThisAbout: "Worum geht es?",
    message: "Nachricht",
    tellUsWhatYouNeed: "Teilen Sie uns mit, was Sie brauchen...",
    thankYouMessage: "Vielen Dank für Ihre Nachricht! Wir melden uns bald.",
    visitOurFarmTitle: "Unseren Hof besuchen",
    callUs: "Anrufen",
    emailUs: "E-Mail senden",
    farmStoreHours: "Hofladen Öffnungszeiten",
    // Footer
    fromFieldToTable: "Von unseren Feldern zu Ihrem Tisch – seit 1987 liefern wir die goldenen Schätze der Natur.",
    products: "Produkte",
    company: "Unternehmen",
    support: "Support",
    helpCenter: "Hilfezentrum",
    shippingInfo: "Versandinfo",
    returns: "Rückgabe",
    wholesale: "Großhandel",
    ourStoryLink: "Unsere Geschichte",
    sustainability: "Nachhaltigkeit",
    privacyPolicy: "Datenschutz",
    termsOfService: "Nutzungsbedingungen",
    allRightsReserved: "Alle Rechte vorbehalten.",
    // Values
    qualityFirst: "Qualität zuerst",
    qualityDesc: "Jedes Korn wird von Hand ausgewählt und geprüft.",
    sustainabilityTitle: "Nachhaltigkeit",
    sustainabilityDesc: "Wir betreiben regenerative Landwirtschaft.",
    heritage: "Erbe",
    heritageDesc: "Drei Generationen landwirtschaftlicher Weisheit.",
    community: "Gemeinschaft",
    communityDesc: "Wir unterstützen lokale Bauern und Gemeinden.",
    // Timeline
    theBeginning: "Der Anfang",
    theBeginningDesc: "James Crown pflanzt sein erstes Maisfeld auf 10 Morgen fruchtbarem Land.",
    growingHeritage: "Wachsendes Erbe",
    growingHeritageDesc: "Der Hof expandiert auf 50 Morgen.",
    organicCertification: "Bio-Zertifizierung",
    organicCertificationDesc: "Corn Crown erhält die Bio-Zertifizierung.",
    directToTable: "Direkt an den Tisch",
    directToTableDesc: "Start der Corn Crown Marke.",
    digitalHarvest: "Digitale Ernte",
    digitalHarvestDesc: "Eröffnung unseres Online-Shops.",
    noProductsFound: "Keine Produkte in dieser Kategorie gefunden.",
    ...deProducts,
    ...deRecipes,
    ...deRecipeContent,
  },
  fa: {
    // Navbar
    home: "خانه",
    shop: "فروشگاه",
    recipes: "دستور پخت",
    about: "درباره ما",
    contact: "تماس",
    shopNow: "خرید کنید",
    premiumCorn: "ذرت ممتاز",
    // Hero
    heroTitle: "کرن کراون",
    heroSubtitle: "ذرت ممتاز، با افتخار برداشت شده",
    heroDesc: "از مزارع آفتاب‌خورده ما تا سفره شما، هر دانه داستانی از سنت، کیفیت و تلاش بی‌وقفه برای کمال را روایت می‌کند.",
    ourStory: "داستان ما",
    // Featured Products
    ourSelection: "انتخاب ما",
    featuredHarvest: "برداشت ویژه",
    featuredDesc: "محبوب‌ترین محصولات ذرت ما را کشف کنید، هر کدام گواهی بر نسل‌ها تخصص کشاورزی.",
    viewAllProducts: "مشاهده همه محصولات",
    // About Preview
    ourHeritage: "میراث ما",
    fromFieldTo: "از مزرعه تا",
    familyTable: "سفره خانواده",
    aboutDesc1: "سه نسل است که خانواده کراون بهترین ذرت را در قلب سرزمین پرورش می‌دهند.",
    aboutDesc2: "هر دانه با مراقبت پرورش می‌یابد، در اوج کمال برداشت می‌شود و با همان غروری که از ۱۹۸۷ خانواده ما را تعریف کرده، تحویل داده می‌شود.",
    discoverOurStory: "داستان ما را کشف کنید",
    visitOurFarm: "از مزرعه ما دیدن کنید",
    // Newsletter
    stayConnected: "در ارتباط بمانید",
    joinTheHarvest: "به برداشت بپیوندید",
    newsletterDesc: "برای دریافت به‌روزرسانی‌ها درباره برداشت‌های فصلی، دستور پخت‌های اختصاصی و پیشنهادات ویژه مستقیماً از مزرعه ما مشترک شوید.",
    enterYourEmail: "ایمیل خود را وارد کنید",
    subscribe: "اشتراک",
    noSpam: "هرزنامه نداریم، فقط محتوای خوب. هر زمان بخواهید لغو اشتراک کنید.",
    // Products page
    ourProducts: "محصولات ما",
    productsDesc: "مجموعه انتخاب شده محصولات ذرت ممتاز ما را کشف کنید.",
    all: "همه",
    sweetCorn: "ذرت شیرین",
    popcorn: "پاپ کورن",
    cornFlour: "آرد ذرت",
    specialty: "تخصصی",
    oils: "روغن‌ها",
    tea: "چای",
    // Product detail
    backToProducts: "بازگشت به محصولات",
    quantity: "تعداد",
    total: "مجموع",
    addToCart: "افزودن به سبد خرید",
    organic: "۱۰۰٪ ارگانیک",
    freeShipping: "ارسال رایگان",
    premiumQuality: "کیفیت ممتاز",
    easyReturns: "بازگشت آسان",
    youMightAlsoLike: "ممکن است این‌ها را هم دوست داشته باشید",
    // About page
    ourStoryTitle: "داستان ما",
    storySubtitle: "سه نسل اشتیاق، سنت و تلاش بی‌وقفه برای دانه کامل.",
    fromSmallFarm: "از یک مزرعه کوچک تا",
    farmDesc1: "آنچه در سال ۱۹۸۷ با یک قطعه زمین ۱۰ جریبی آغاز شد، به میراثی از تعالی کشاورزی تبدیل شده است.",
    farmDesc2: "تعهد ما فراتر از کاشت ذرت است. ما نگهبان زمین هستیم.",
    milestones: "نقاط عطف و خاطرات",
    ourCoreValues: "ارزش‌های اصلی ما",
    tasteTheDifference: "تفاوت را بچشید",
    tasteDesc: "آماده‌اید ذرت را همان‌طور که طبیعت در نظر گرفته تجربه کنید؟",
    // Contact
    getInTouch: "با ما",
    touch: "تماس بگیرید",
    contactDesc: "سوالی درباره محصولات ما دارید؟ مایلید از مزرعه بازدید کنید؟ خوشحال می‌شویم از شما بشنویم.",
    sendMessage: "پیام بفرستید",
    name: "نام",
    yourName: "نام شما",
    email: "ایمیل",
    subject: "موضوع",
    whatIsThisAbout: "درباره چیست؟",
    message: "پیام",
    tellUsWhatYouNeed: "به ما بگویید چه نیاز دارید...",
    thankYouMessage: "از پیام شما متشکریم! به زودی با شما تماس خواهیم گرفت.",
    visitOurFarmTitle: "از مزرعه ما دیدن کنید",
    callUs: "تماس بگیرید",
    emailUs: "ایمیل بفرستید",
    farmStoreHours: "ساعات کاری فروشگاه",
    // Footer
    fromFieldToTable: "از مزارع ما تا سفره شما، از سال ۱۹۸۷ گنج‌های طلایی طبیعت را تحویل می‌دهیم.",
    products: "محصولات",
    company: "شرکت",
    support: "پشتیبانی",
    helpCenter: "مرکز راهنمایی",
    shippingInfo: "اطلاعات ارسال",
    returns: "بازگشت",
    wholesale: "عمده فروشی",
    ourStoryLink: "داستان ما",
    sustainability: "پایداری",
    privacyPolicy: "حریم خصوصی",
    termsOfService: "شرایط خدمات",
    allRightsReserved: "تمام حقوق محفوظ است.",
    // Values
    qualityFirst: "کیفیت اول",
    qualityDesc: "هر دانه با دست انتخاب و بازرسی می‌شود.",
    sustainabilityTitle: "پایداری",
    sustainabilityDesc: "ما کشاورزی احیاکننده انجام می‌دهیم.",
    heritage: "میراث",
    heritageDesc: "سه نسل خرد کشاورزی.",
    community: "جامعه",
    communityDesc: "حمایت از کشاورزان و جوامع محلی.",
    // Timeline
    theBeginning: "آغاز",
    theBeginningDesc: "جیمز کراون اولین مزرعه ذرت خود را در ۱۰ جریب زمین حاصلخیز می‌کارد.",
    growingHeritage: "میراث رو به رشد",
    growingHeritageDesc: "مزرعه به ۵۰ جریب گسترش می‌یابد.",
    organicCertification: "گواهی ارگانیک",
    organicCertificationDesc: "کرن کراون گواهی ارگانیک دریافت می‌کند.",
    directToTable: "مستقیم به سفره",
    directToTableDesc: "راه‌اندازی برند کرن کراون.",
    digitalHarvest: "برداشت دیجیتال",
    digitalHarvestDesc: "افتتاح فروشگاه آنلاین ما.",
    noProductsFound: "محصولی در این دسته‌بندی یافت نشد.",
    ...faProducts,
    ...faRecipes,
    ...faRecipeContent,
  },
  es: {
    // Navbar
    home: "Inicio",
    shop: "Tienda",
    recipes: "Recetas",
    about: "Nosotros",
    contact: "Contacto",
    shopNow: "Comprar ahora",
    premiumCorn: "Maíz Premium",
    // Hero
    heroTitle: "Corn Crown",
    heroSubtitle: "Maíz Premium, Cosechado con Orgullo",
    heroDesc: "Desde nuestros campos bañados por el sol hasta su mesa, cada grano cuenta una historia de tradición, calidad y la búsqueda incesante de la perfección.",
    ourStory: "Nuestra Historia",
    // Featured Products
    ourSelection: "Nuestra Selección",
    featuredHarvest: "Cosecha Destacada",
    featuredDesc: "Descubra nuestros productos de maíz más queridos, cada uno un testimonio de generaciones de experiencia agrícola.",
    viewAllProducts: "Ver Todos los Productos",
    // About Preview
    ourHeritage: "Nuestra Herencia",
    fromFieldTo: "Del Campo a la",
    familyTable: "Mesa Familiar",
    aboutDesc1: "Por tres generaciones, la familia Crown ha cultivado el mejor maíz en el corazón del país.",
    aboutDesc2: "Cada grano es cuidado con esmero, cosechado en su punto máximo de perfección y entregado con el mismo orgullo que ha definido a nuestra familia desde 1987.",
    discoverOurStory: "Descubra Nuestra Historia",
    visitOurFarm: "Visite Nuestra Granja",
    // Newsletter
    stayConnected: "Manténgase Conectado",
    joinTheHarvest: "Únase a la Cosecha",
    newsletterDesc: "Suscríbase para recibir actualizaciones sobre cosechas de temporada, recetas exclusivas y ofertas especiales directamente de nuestra granja.",
    enterYourEmail: "Ingrese su correo electrónico",
    subscribe: "Suscribirse",
    noSpam: "Sin spam, solo lo bueno. Cancele en cualquier momento.",
    // Products page
    ourProducts: "Nuestros Productos",
    productsDesc: "Explore nuestra colección curada de productos premium de maíz.",
    all: "Todos",
    sweetCorn: "Maíz Dulce",
    popcorn: "Palomitas",
    cornFlour: "Harina de Maíz",
    specialty: "Especialidades",
    oils: "Aceites",
    tea: "Té",
    // Product detail
    backToProducts: "Volver a Productos",
    quantity: "Cantidad",
    total: "total",
    addToCart: "Agregar al Carrito",
    organic: "100% Orgánico",
    freeShipping: "Envío Gratis",
    premiumQuality: "Calidad Premium",
    easyReturns: "Devolución Fácil",
    youMightAlsoLike: "También Le Puede Gustar",
    // About page
    ourStoryTitle: "Nuestra Historia",
    storySubtitle: "Tres generaciones de pasión, tradición y la búsqueda del grano perfecto.",
    fromSmallFarm: "De una Pequeña Granja a Su",
    farmDesc1: "Lo que comenzó como una parcela de 10 acres atendida por James Crown en 1987 se ha convertido en un legado de excelencia agrícola.",
    farmDesc2: "Nuestro compromiso va más allá del cultivo del maíz. Somos guardianes de la tierra.",
    milestones: "Hitos y Recuerdos",
    ourCoreValues: "Nuestros Valores Fundamentales",
    tasteTheDifference: "Pruebe la Diferencia",
    tasteDesc: "¿Listo para experimentar el maíz como lo concibió la naturaleza?",
    // Contact
    getInTouch: "Póngase en",
    touch: "Contacto",
    contactDesc: "¿Tiene preguntas sobre nuestros productos? ¿Desea programar una visita a la granja? Nos encantaría saber de usted.",
    sendMessage: "Envíenos un Mensaje",
    name: "Nombre",
    yourName: "Su nombre",
    email: "Correo",
    subject: "Asunto",
    whatIsThisAbout: "¿De qué se trata?",
    message: "Mensaje",
    tellUsWhatYouNeed: "Díganos qué necesita...",
    thankYouMessage: "¡Gracias por su mensaje! Nos pondremos en contacto pronto.",
    visitOurFarmTitle: "Visite Nuestra Granja",
    callUs: "Llámenos",
    emailUs: "Envíenos un Correo",
    farmStoreHours: "Horario de la Tienda",
    // Footer
    fromFieldToTable: "De nuestros campos a su mesa, entregando los tesoros dorados de la naturaleza desde 1987.",
    products: "Productos",
    company: "Empresa",
    support: "Soporte",
    helpCenter: "Centro de Ayuda",
    shippingInfo: "Info de Envío",
    returns: "Devoluciones",
    wholesale: "Mayoreo",
    ourStoryLink: "Nuestra Historia",
    sustainability: "Sostenibilidad",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    allRightsReserved: "Todos los derechos reservados.",
    // Values
    qualityFirst: "Calidad Primero",
    qualityDesc: "Cada grano es seleccionado a mano e inspeccionado.",
    sustainabilityTitle: "Sostenibilidad",
    sustainabilityDesc: "Practicamos la agricultura regenerativa.",
    heritage: "Herencia",
    heritageDesc: "Tres generaciones de sabiduría agrícola.",
    community: "Comunidad",
    communityDesc: "Apoyando a los agricultores y comunidades locales.",
    // Timeline
    theBeginning: "El Comienzo",
    theBeginningDesc: "James Crown planta su primer campo de maíz en 10 acres de tierra fértil.",
    growingHeritage: "Herencia Creciente",
    growingHeritageDesc: "La granja se expande a 50 acres.",
    organicCertification: "Certificación Orgánica",
    organicCertificationDesc: "Corn Crown recibe la certificación orgánica.",
    directToTable: "Directo a la Mesa",
    directToTableDesc: "Lanzamiento de la marca Corn Crown.",
    digitalHarvest: "Cosecha Digital",
    digitalHarvestDesc: "Apertura de nuestra tienda en línea.",
    noProductsFound: "No se encontraron productos en esta categoría.",
    ...esProducts,
    ...esRecipes,
    ...esRecipeContent,
  },
};

interface LanguageContextType {
  currentLang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  localize: (key: string, fallback: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lang");
      if (saved) {
        const found = languages.find((l) => l.code === saved);
        if (found) return found;
      }
    }
    return languages[0];
  });

  useEffect(() => {
    document.documentElement.dir = currentLang.dir;
    document.documentElement.lang = currentLang.code;
  }, []);

  const setLang = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem("lang", lang.code);
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = lang.code;
  };

  const t = (key: string): string => {
    return translations[currentLang.code][key] || key;
  };

  const localize = (key: string, fallback: string): string => {
    return translations[currentLang.code][key] || fallback;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLang, t, localize }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
