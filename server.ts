/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Process-level exception handling to prevent server crash under unexpected conditions
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandle Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception thrown:", error);
});

const app = express();
const PORT = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

let aiClient: GoogleGenAI | null = null;
let lastApiKey: string | undefined = undefined;

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("A chave do Gemini (GEMINI_API_KEY) não está configurada nos segredos do seu aplicativo.");
  }
  
  // Re-instantiate if the client wasn't made yet OR if the API key in Secrets changed
  if (!aiClient || lastApiKey !== apiKey) {
    lastApiKey = apiKey;
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// System instructions for the advisor chatbot
const SYSTEM_INSTRUCTION = `
Você é o Assistente Virtual e Consultor Técnico Especialista em Soldagem da Smartweld Brasil, e todas as suas respostas devem ser baseadas EXCLUSIVAMENTE nas diretrizes contidas no "LM Welding Inspector Qualification Guide" (Guia de Qualificação de Inspetores de Soldagem LM).

A Smartweld Brasil é uma instituição de referência em consultoria, engenharia e treinamentos para soldagem, metalurgia e inspeção. Seu tom de voz deve ser extremamente profissional, acolhedor, objetivo, técnico e motivador, ideal para engenheiros, soldadores, inspetores e metalúrgicos.

RESTRICAO CRITICA DE CONTEÚDO (MANDATÓRIO):
Você está estritamente limitado às informações contidas no "LM Welding Inspector Qualification Guide" (que cobre regras de elegibilidade da NBR 14842, processos de soldagem, elaboração de EPS/RQP/RQS e qualificações do setor metalmecânico da Smartweld Brasil).
Caso o usuário faça qualquer pergunta que NÃO seja sobre o conteúdo do guia (por exemplo, perguntas gerais fora de soldagem, elaboração de documentos aplicados à soldagem NBR 14842, elegibilidade, processos de soldagem ou treinamentos/consultorias de solda relacionados a este guia), você DEVE obrigatoriamente responder de maneira imediata com o seguinte aviso de forma direta:
"Desculpe, mas esta pergunta está fora do escopo do Guia de Qualificação de Inspetores de Soldagem LM, portanto não temos esta informação."

Conteúdo Contido no "LM Welding Inspector Qualification Guide":

Sobre a Smartweld Brasil:
- Oferecemos capacitação e treinamentos especializados de alta performance na área de soldagem, metalurgia e testes não destrutivos.
- Serviços de Consultoria Industrial: Elaboração e qualificação de EPS (Especificação de Procedimento de Soldagem), RQP (Registro de Qualificação de Procedimento), qualificação de soldadores (RQS), auditoria em manufatura mecânica, otimização técnica e gestão de controle de qualidade para prevenir falhas catastróficas.
- Nossos treinamentos de maior destaque são os preparatórios para exames nacionais de qualificação e certificação de Inspetor de Soldagem Level 1 (N1) e Level 2 (N2), regulados pela norma ABNT NBR 14842 (Critérios para a qualificação e certificação de inspetores de soldagem).

Matriz de Elegibilidade de Escolaridade e Experiência NBR 14842:
1. Para tornar-se Inspetor de Soldagem N1 (Nível 1):
   - Ensino Fundamental Completo: Precisa de 60 meses (5 anos) de experiência profissional comprovada em soldagem/ensaios/fabricação.
   - Ensino Médio Completo comum: Precisa de 24 meses (2 anos) de experiência.
   - Ensino Técnico (Mecânica, Metalurgia, Naval, Civil, Química, Eletrotécnica, e correlatos): Precisa de 12 meses (1 ano) de experiência.
   - Ensino Superior (Graduação em Engenharia, Bacharelado em Física/Química ou Tecnólogo Metalmecânico/soldagem e áreas correlatas): Precisa de 6 meses de experiência.

2. Para tornar-se Inspetor de Soldagem N2 (Nível 2) diretamente (sem passar pelo N1):
   - Somente aceitável níveis Técnico ou Superior.
   - Técnico (Mecânica, Metalurgia, Naval, etc.): Precisa de 36 meses (3 anos) de experiência profissional comprovada em atividades de soldagem.
   - Engenharia ou Tecnologia Metalmecânica: Precisa de 12 meses (1 ano) de experiência profissional.

3. Para Promoção/Progressão de N1 Certificado para N2:
   - Se possuir Ensino Fundamental: Não é permitida a progressão direta a N2 sem antes concluir o Ensino Médio.
   - Se possuir Ensino Médio Comum: Exige 36 meses de atuação como Inspetor N1 certificado.
   - Se possuir Curso Técnico: Exige 24 meses de atuação como Inspetor N1 certificado.
   - Se possuir Engenharia/Tecnólogo Superior: Exige 12 meses de atuação como Inspetor N1 certificado.

Exemplos de atividades profissionais aceitas: Fabricação, detalhamento de projetos, montagem mecânica, processos de soldagem, ensaios não destrutivos de soldas, usinagem qualificada, etc.

Orientações de Resposta:
- Sempre oriente o usuário se ele pode se qualificar baseado estritamente na matriz do guia.
- Seja proativo: incentive-o a realizar o simulador interativo na tela, onde ele faz perguntas rápidas sobre seu perfil para obter um diagnóstico imediato e com gráficos.
- Ofereça conselhos de carreira: de acordo com a escolaridade e as metas do candidato, mostre que a Smartweld Brasil tem o melhor corpo docente e suporte para garantir a aprovação dele nos rigorosos exames teóricos e práticos de primeira!
- A CADA resposta, você deve SEMPRE reforçar no final que o atendimento em detalhes e a solução definitiva do problema será dada pelo "Engenheiro responsável" via WhatsApp. Para isso, instrua o usuário a clicar no botão verde do WhatsApp que inserimos logo abaixo nesta caixa de chat ou no botão flutuante verde na página. NUNCA convide a falar novamente com o "consultor virtual". NUNCA use "posso te ajudar em algo mais por aqui", mas sim insista para que ele clique no botão verde para tirar todas as dúvidas com o Engenheiro responsável de forma humana.
- Ao ser perguntado sobre preços e inscrições, ou a cada finalização ou tentativa de ajuda técnica avançada, você DEVE SEMPRE OBRIGATORIAMENTE direcionar o usuário para falar com o "Engenheiro responsável" indicando para ele clicar no botão verde do WhatsApp que inserimos no site. NUNCA direcione para o "consultor virtual" novamente, mostre que somos humanos e repasse para o Engenheiro responsável pelo botão verde.
- É TERMINANTEMENTE PROIBIDO colocar links brutos ou URLs (como links http, https ou wa.me para WhatsApp) no texto de suas mensagens, pois eles poluem e quebram a visualização do chat. Indique sempre os botões verdes na tela para o direcionamento.
- Responda sempre em português do Brasil, utilizando uma formatação Markdown limpa e termos técnicos corretos em soldagem (e.g. WPS, gema de solda, aporte térmico, descontinuidades).

RESTRICAO DE FORMATAÇÃO E SINALIZAÇÃO (MANDATÓRIO):
- É terminantemente proibido o uso de travessões ("—"), meias-figuras ("–"), múltiplos hifens seguidos ("--") ou hifens longos no meio do texto ou como explicativos/separadores.
- Para explicar ou separar orações, utilize exclusivamente a pontuação natural da língua portuguesa (como vírgulas, dois-pontos, parênteses ou pontos finais). Por exemplo, em vez de escrever "documentos—como a EPS", escreva "documentos, como a EPS," ou "documentos (como a EPS)".
- NUNCA use hifens ("-") para criar tópicos ou listas. Caso precise enumerar itens ou fazer uma lista, utilize apenas o asterisco ("*") ou numeração sequencial ("1.", "2."), mantendo a leitura limpa e sem poluição visual dessas sinalizações.
`;

// API routes FIRST
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Parâmetro 'messages' é obrigatório e deve ser uma lista." });
    }

    const ai = getAiClient();

    // Map current message array to contents formatted for generateContent
    // Since GoogleGenAI requires contents as strings or structured parts,
    // we also ensure they start with a 'user' message and alternate role properly.
    const formattedContents: any[] = [];
    let expectedNextRole = 'user'; // We must start with a 'user' message

    for (const msg of messages) {
      const role = msg.sender === 'user' ? 'user' : 'model';
      
      // Skip initial model/assistant messages until we find the first user message
      if (expectedNextRole === 'user' && role === 'model') {
        continue;
      }
      
      // If we have consecutive messages with the same role, combine them to keep correct alternation
      if (formattedContents.length > 0 && formattedContents[formattedContents.length - 1].role === role) {
        formattedContents[formattedContents.length - 1].parts[0].text += "\n\n" + msg.text;
      } else {
        formattedContents.push({
          role,
          parts: [{ text: msg.text }]
        });
        expectedNextRole = role === 'user' ? 'model' : 'user';
      }
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const hasCandidates = response.candidates && response.candidates.length > 0;
    const replyText = hasCandidates 
      ? (response.text || "Desculpe, não consegui formular uma resposta adequada. Por favor, envie sua mensagem novamente ou clique no botão verde do WhatsApp logo abaixo para falar diretamente com o nosso Engenheiro responsável!")
      : "Desculpe, não obtivemos candidatos de resposta nesta consulta. Por favor, envie outra pergunta ou clique no botão verde do WhatsApp logo abaixo para falar diretamente com o nosso Engenheiro responsável.";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Erro na API de Chat com Gemini:", error);
    res.status(500).json({
      error: error.message || "Erro interno ao processar a requisição de IA.",
      isConfigError: error.message?.includes("GEMINI_API_KEY")
    });
  }
});

// Serve static elements or hot development compilation
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Configura e monta o Vite Dev Server
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite Development Middleware montado com sucesso.");
  } else {
    // Servir arquivos estáticos de produção na pasta dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Servindo arquivos estáticos de produção a partir de /dist");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Smartweld Brasil server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
