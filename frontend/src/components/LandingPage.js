import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  StarIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import {
  Sofa,
  Car,
  Building,
  Stethoscope,
  Square,
  ArrowUp,
  Shield,
  Award,
  Users,
  Clock,
  MessageCircle,
  X,
  ExternalLink,
} from "lucide-react";

/** ========= Helpers de Rastreamento ========= */
function trackAdsConversion({ sendTo, value, currency = "BRL" }) {
  if (window.gtag) {
    const params = { send_to: sendTo };
    if (typeof value === "number") {
      params.value = value;
      params.currency = currency;
    }
    window.gtag("event", "conversion", params);
  }
}

// (Opcional) valores por serviço para otimizar lances (ajuste como preferir)
const CONVERSION_VALUES = {
  "Higienização de Estofados": 1.0,
  "Higienização de Veículos": 0.8,
  "Limpeza de Escritórios": 1.4,
  "Higienização de Clínicas": 1.6,
  "Limpeza de Tapetes": 0.7,
  "Limpeza de Elevadores": 1.2,
};

// ID/Label da conversão (seu rótulo do Google Ads)
const ADS_SEND_TO = "AW-17510682790/83HPCJXX754bEKah351B";
/** ========================================== */

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const closeBtnRef = useRef(null);

  // Evita clique repetido muito rápido gerar disparo duplo
  let waClickLock = false;

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && closeModal();
    if (isModalOpen) {
      document.addEventListener("keydown", onEsc);
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }
    return () => document.removeEventListener("keydown", onEsc);
  }, [isModalOpen]);

  const services = [
    {
      icon: <Sofa className="w-8 h-8" />,
      title: "Higienização de Estofados",
      description:
        "Limpeza profunda e hipermeabilização de sofás, poltronas e móveis estofados.",
      image: "/img/estofados-1200.jpg",
      details: {
        highlights: [
          "Extração profunda de sujeira",
          "Secagem mais rápida",
          "Opção de impermeabilização",
        ],
        text: "Remove manchas e odores, devolvendo o conforto e prolongando a vida útil do tecido. Ideal para lares com crianças, pets ou alta circulação.",
        ctaLabel: "Quero impermeabilizar",
        ctaLink:
          "https://wa.me/5551992316723?text=Estofados%20-%20impermeabiliza%C3%A7%C3%A3o",
      },
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Higienização de Veículos",
      description:
        "Limpeza completa de bancos, carpetes e acabamentos internos automotivos.",
      image: "/img/veiculos-1200.jpg",
      details: {
        highlights: [
          "Extração profunda dos tecidos",
          "Remoção de odores (suor, comida, pets)",
          "Higienização do ar e plásticos internos",
        ],
        text: "Seu carro com aparência e cheiro de novo: bancos, teto, forrações e carpetes com limpeza técnica e produtos adequados.",
        ctaLabel: "Quero higienizar meu carro",
        ctaLink:
          "https://wa.me/5551992316723?text=Ve%C3%ADculos%20-%20higieniza%C3%A7%C3%A3o",
      },
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Limpeza de Escritórios",
      description:
        "Higienização completa de ambientes corporativos e comerciais.",
      image: "/img/escritorio-1200.jpg",
      details: {
        highlights: [
          "Ambientes sem poeira e ácaros",
          "Cuidado com estações e eletrônicos",
          "Atuação fora do horário comercial",
        ],
        text: "Rotinas customizadas por área (salas, recepção, copa) para manter produtividade e imagem profissional sem interromper suas operações.",
        ctaLabel: "Falar com especialista",
        ctaLink:
          "https://wa.me/5551992316723?text=Escrit%C3%B3rio%20-%20quero%20detalhes",
      },
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Higienização de Clínicas",
      description:
        "Limpeza especializada para ambientes médicos e de saúde.",
      image: "/img/clinicas-1200.jpg",
      details: {
        highlights: [
          "Protocolos e EPIs adequados",
          "Foco em cadeiras, recepção e áreas críticas",
          "Produtos compatíveis com área da saúde",
        ],
        text: "Reduz riscos, melhora a segurança do paciente e equipe, e mantém seu consultório dentro de boas práticas de limpeza.",
        ctaLabel: "Ver protocolos",
        ctaLink:
          "https://wa.me/5551992316723?text=Cl%C3%ADnicas%20-%20protocolos",
      },
    },
    {
      icon: <Square className="w-8 h-8" />,
      title: "Limpeza de Tapetes",
      description:
        "Higienização profunda de tapetes e carpetes residenciais e comerciais.",
      image: "/img/tapetes-1200.jpg",
      details: {
        highlights: [
          "Lavagem técnica por extração",
          "Remoção de manchas e pelos de pets",
          "Neutralização de odores (mofo, urina, comida)",
        ],
        text: "Cuidamos de tapetes sintéticos e fibras naturais (como lã) com produtos e técnicas adequadas, restaurando maciez e cor.",
        ctaLabel: "Quero higienizar meu tapete",
        ctaLink: "https://wa.me/5551992316723?text=Tapetes%20-%20or%C3%A7amento",
      },
    },
    {
      icon: <ArrowUp className="w-8 h-8" />,
      title: "Limpeza de Elevadores",
      description:
        "Higienização especializada de elevadores e espaços confinados.",
      image: "/img/elevadores-1200.jpg",
      details: {
        highlights: [
          "Proteções de cabine e portas durante a execução",
          "Produtos adequados para painéis e aço inox",
          "Remoção de odores e higienização de botoeiras",
        ],
        text: "Ideal para condomínios e prédios comerciais que precisam manter cabines limpas e sem odores, com mínima interrupção.",
        ctaLabel: "Solicitar orçamento",
        ctaLink:
          "https://wa.me/5551992316723?text=Quero%20or%C3%A7amento%20para%20elevadores",
      },
    },
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Gerente de Facilities",
      company: "TechCorp Porto Alegre",
      text: "A TokClean transformou completamente nosso escritório. Profissionais competentes e resultado excepcional.",
      rating: 5,
    },
    {
      name: "Dr. Carlos Medeiros",
      role: "Diretor Médico",
      company: "Clínica Saúde Total",
      text: "Serviço impecável para nossa clínica. Seguem todos os protocolos de higienização médica.",
      rating: 5,
    },
    {
      name: "Ana Paula Costa",
      role: "Proprietária",
      company: "Residencial",
      text: "Meu sofá ficou como novo! Atendimento excelente e preço justo. Super recomendo!",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Produtos Certificados",
      description:
        "Utilizamos apenas produtos de alta qualidade e certificados para higienização.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Profissionais Qualificados",
      description:
        "Equipe treinada e certificada para todos os tipos de limpeza especializada.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Atendimento Personalizado",
      description:
        "Cada cliente recebe um atendimento único e personalizado às suas necessidades.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Pontualidade Garantida",
      description:
        "Respeitamos prazos e horários estabelecidos com total pontualidade.",
    },
  ];

  const workProcess = [
    {
      step: "01",
      title: "Avaliação Gratuita",
      description:
        "Visitamos o local e fazemos uma avaliação completa das necessidades.",
    },
    {
      step: "02",
      title: "Orçamento Personalizado",
      description:
        "Elaboramos um orçamento detalhado e transparente para o serviço.",
    },
    {
      step: "03",
      title: "Execução Profissional",
      description:
        "Nossa equipe executa o serviço com máxima qualidade e segurança.",
    },
    {
      step: "04",
      title: "Garantia de Satisfação",
      description:
        "Garantimos a qualidade do serviço e sua total satisfação.",
    },
  ];

  /** Clique de WhatsApp (header, contato e botão flutuante) */
  const handleWhatsAppClick = (serviceTitle) => {
    if (waClickLock) return;
    waClickLock = true;
    setTimeout(() => (waClickLock = false), 1500);

    // (Opcional) valor por serviço
    const value =
      typeof serviceTitle === "string"
        ? CONVERSION_VALUES[serviceTitle] ?? undefined
        : undefined;

    // Dispara a conversão
    trackAdsConversion({
      sendTo: ADS_SEND_TO,
      value,
      currency: "BRL",
    });

    // Abre WhatsApp
    const phoneNumber = "5551992316723";
    const message =
      "Olá! Gostaria de solicitar um orçamento para serviços de higienização da TokClean.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
            <h1 className="text-2xl font-bold text-gray-800">TokClean</h1>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#servicos" className="text-gray-700 hover:text-blue-600 transition-colors">Serviços</a>
            <a href="#sobre" className="text-gray-700 hover:text-blue-600 transition-colors">Sobre</a>
            <a href="#depoimentos" className="text-gray-700 hover:text-blue-600 transition-colors">Depoimentos</a>
            <a href="#contato" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">Contato</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 mix-blend-overlay opacity-30">
          <img
            src="https://images.unsplash.com/photo-1563453392212-326f5e854473?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHNlcnZpY2V8ZW58MHx8fGJsdWV8MTc1MjQyMDQ1OHww&ixlib=rb-4.1.0&q=85"
            alt="Limpeza profissional"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Higienização
              <span className="block text-blue-300">Profissional</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Serviços especializados de limpeza e hipermeabilização para estofados, veículos, escritórios e clínicas na Grande Porto Alegre
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWhatsAppClick()}
                className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-6 h-6" />
                WhatsApp - Orçamento
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Nossos Serviços
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-400/20 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-blue-300/20 rounded-full animate-bounce delay-2000"></div>
      </section>

      {/* Services */}
      <section id="servicos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Soluções completas em higienização e limpeza profissional para todos os ambientes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-zoom-in"
                    onClick={() => openModal(service)}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <div className="text-blue-600">{service.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <button
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    onClick={() => openModal(service)}
                  >
                    Saiba mais →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Por que escolher a TokClean?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compromisso com a excelência em cada detalhe
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Como Trabalhamos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Processo simples e eficiente para garantir sua satisfação
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workProcess.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                  {process.title}
                </h3>
                <p className="text-gray-600 text-center">{process.description}</p>

                {index < workProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200">
                    <div className="w-0 h-full bg-blue-600 animate-pulse"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Depoimentos reais de clientes satisfeitos com nossos serviços
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <StarIcon key={i} className="w-6 h-6 text-yellow-500" />
                  )
                )}
              </div>
              <p className="text-xl text-gray-600 mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-gray-600">
                  {testimonials[currentTestimonial].role}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonials[currentTestimonial].company}
                </p>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Solicite seu Orçamento
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Entre em contato conosco e receba uma proposta personalizada para suas necessidades
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-6">Fale Conosco</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <PhoneIcon className="w-6 h-6 text-blue-300" />
                  <div>
                    <p className="font-semibold">Telefone</p>
                    <p className="opacity-90">(51) 99231-6723</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MessageCircle className="w-6 h-6 text-blue-300" />
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWhatsAppClick()}
                      className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors mt-1"
                    >
                      (51) 99231-6723 - Clique aqui
                    </motion.button>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <EnvelopeIcon className="w-6 h-6 text-blue-300" />
                  <div>
                    <p className="font-semibold">E-mail</p>
                    <p className="opacity-90">tokclean.empresarial@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPinIcon className="w-6 h-6 text-blue-300" />
                  <div>
                    <p className="font-semibold">Região de Atendimento</p>
                    <p className="opacity-90">Porto Alegre e Região Metropolitana</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 text-gray-800"
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nome Completo</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Telefone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(51) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Serviço Desejado</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Selecione um serviço</option>
                    <option>Higienização de Estofados</option>
                    <option>Higienização de Veículos</option>
                    <option>Limpeza de Escritórios</option>
                    <option>Higienização de Clínicas</option>
                    <option>Limpeza de Tapetes</option>
                    <option>Limpeza de Elevadores</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Mensagem</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descreva suas necessidades..."
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Enviar Mensagem
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Botão flutuante WhatsApp */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleWhatsAppClick()}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          1
        </span>
      </motion.button>

      {/* Modal */}
      {isModalOpen && selectedService && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 max-w-5xl w-[92%] bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h3 className="text-lg font-semibold">{selectedService.title}</h3>
              <button
                ref={closeBtnRef}
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="grid md:grid-cols-2 gap-0">
              {/* Imagem */}
              <div className="bg-black">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full md:h-[520px] object-contain bg-black"
                />
              </div>

              {/* Informações */}
              <div className="p-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedService.details?.text || selectedService.description}
                </p>

                {selectedService.details?.highlights?.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-gray-800 list-disc pl-5">
                    {selectedService.details.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  {selectedService.details?.ctaLink && (
                    <a
                      href={selectedService.details.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        handleWhatsAppClick(selectedService.title)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {selectedService.details?.ctaLabel || "Entrar em contato"}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
