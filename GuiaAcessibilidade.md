# Guia de Boas Práticas de Acessibilidade Digital

## Introdução

Em meio a um cenário de avanços tecnológicos e de transformação digital, torna-se urgente a preocupação e o compromisso da gestão pública com a inclusão digital de todos os cidadãos. Sem essa inclusão, a transformação digital torna-se mais uma barreira do que um facilitador. Por outro lado, uma transformação digital focada no ser humano usa a tecnologia para criar uma sociedade mais igualitária, garantindo acesso a serviços essenciais, diminuindo a burocracia, aumentando a eficiência, a transparência e a cidadania ativa.

A implementação da acessibilidade digital promove o acesso igualitário aos conteúdos e serviços públicos, garantindo que os usuários possam navegar com autonomia e compreender com facilidade seu conteúdo. Embora o foco deste guia seja garantir o acesso de pessoas com diversos tipos de deficiência, essa inclusão acaba sendo benéfica para toda a sociedade, pois também impacta outros grupos com baixa adaptação digital, como pessoas idosas ou com baixo nível de escolaridade, por exemplo.

A melhoria da acessibilidade e da usabilidade de portais não impacta negativamente quem não necessita delas, mas representa uma enorme diferença para todos aqueles que, muitas vezes, se vêem impossibilitados de acessar serviços apenas pelo fato de estarem em formato digital.   

Visando estabelecer esse compromisso com a população carioca, a Prefeitura da Cidade do Rio de Janeiro, a partir do trabalho da Subsecretaria de Transformação Digital e Cidades Inteligentes, cria o *Guia de Boas Práticas de Acessibilidade Digital*, que tem como objetivo unir transformação digital e inclusão, trazendo um compilado de diretrizes, critérios práticos e tutoriais que visam orientar Secretarias e demais Órgãos municipais a adequarem seus portais destinados aos cidadãos.

Reconhecemos as dificuldades intrínsecas à empreitada, mas reforçamos que mudanças dependem de engajamento e proatividade, mesmo que ocorram de forma gradual. Olhar para acessibilidade e usabilidade de nossos portais é também enxergar que todo e qualquer cidadão carioca precisa ter seus direitos assegurados e isso precisa ser prioridade para a gestão pública.

## Compreendendo a acessibilidade

### Pessoas com Deficiência: definição

Segundo o Ministério da Saúde brasileiro, “pessoas com deficiência são aquelas que têm **impedimento de médio ou longo prazo de natureza física, mental, intelectual ou sensorial**, o que, em interação com uma ou mais barreiras, pode obstruir sua participação plena e efetiva na sociedade em igualdade de condições com as demais pessoas”[^1].  

Ou seja, a deficiência não é somente um atributo de cunho físico-biológico, mas sim o **resultado da interação** entre as limitações da pessoa e as barreiras do meio onde ela se encontra. Podemos encontrar essas barreiras na arquitetura, nos transportes, nas comunicações, na informação, na tecnologia, além das barreiras atitudinais (preconceitos). **Mas com acessibilidade e inclusão, as limitações da pessoa passam a ser apenas uma característica e não um motivo de exclusão.**

### Tipos de Deficiência

No que se refere à origem da deficiência, o Ministério da Saúde reconhece que ela pode ser **congênita** (quando a pessoa já nasce com a deficiência) ou **adquirida** (quando a pessoa passa a ter a deficiência a partir de algum momento da vida, por motivos como doença ou acidente, por exemplo). Ela também pode ser **permanente** ou **temporária**, no que diz respeito à duração. 

Oficialmente, o Brasil reconhece como tipos de deficiência: **a física, visual, auditiva, intelectual** e **múltiplas** (quando a pessoa tem mais de um tipo de deficiência). Ainda assim, o nosso Sistema Único de Saúde também trata como tal, as **deficiências invisíveis ou ocultas**, como:

(...) fibromialgia, lúpus, esclerose múltipla, endometriose, osteoporose, enxaqueca, surdez, baixa visão, doença de Alzheimer, dificuldades de aprendizado, esquizofrenia, TEA (transtorno do espectro autista), TDAH (transtorno de déficit de atenção e hiperatividade), depressão, TAB (transtorno afetivo bipolar), TAG (transtorno de ansiedade generalizada) e diversas outras[^2].

	Além dos parâmetros do Ministério da Saúde, existem também os adotados pelo IBGE para realizar o Censo, que é a nossa principal forma de verificar os índices de pessoas com deficiência em todo o território nacional. Mas até mesmo dentro do próprio aferimento do IBGE existem mudanças teórico-metodológicas que precisamos levar em consideração.

No Censo IBGE 2010[^3], a metodologia utilizada para verificar se a pessoa entrevistada tinha algum tipo de deficiência já seguia a proposta do **Washington Group** sobre Estatísticas das Pessoas com Deficiência, a mesma utilizada pela ONU. As perguntas buscavam identificar se a pessoa tinha deficiência **visual, auditiva, motora, mental/intelectual ou múltipla.** Além do tipo, levava em consideração três níveis de severidade, tendo como referência o grau de dificuldade da pessoa para realizar algumas atividades rotineiras, sendo esses níveis: **alguma dificuldade, grande dificuldade (mesmo com uso de algum aparelho) ou não conseguia de jeito algum.** 

Naquele ano, a população total do Brasil era de **190.755.799 habitantes**, e **23,9% da população** (45.606.048 pessoas) declarou possuir, pelo menos, uma das deficiências investigadas em algum grau:

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 01]**  
> **Título:** Censo IBGE 2010 — População Geral com Deficiência  
> **Descrição da Arte:** Infográfico com destaque estatístico para os 23,9% da população brasileira (45.606.048 pessoas de um total de 190.755.799 habitantes) que declararam possuir pelo menos uma deficiência em algum grau no Censo 2010. Detalhamento por tipos: Visual (18,6%), Motora (7,0%), Auditiva (5,1%) e Mental/Intelectual (1,4%).  
> **Elementos Visuais:** Gráfico de barras estilizadas com pictogramas acessíveis para cada tipo de deficiência (olho, cadeira de rodas, ouvido, cérebro/mente). Tipografia destacada para '23,9%'.  
> **Paleta Sugerida:** Azul institucional Prefeitura do Rio (#002B49 e #004A80), ciano (#00C0F3) e neutros de alto contraste.  
> **Diretriz de Acessibilidade:** Garantir contraste de texto mínimo de 4.5:1 sobre o fundo. Não diferenciar os tipos de deficiência apenas pela cor das barras.

No que se refere às deficiências severas, o percentual caía para **8,3% da população brasileira**, representando aquelas pessoas que tinham muita dificuldade ou não conseguiam realizar as atividades de modo algum. 

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 02]**  
> **Título:** Censo IBGE 2010 — Comparação: Deficiência Geral (23,9%) vs. Severa (8,3%)  
> **Descrição da Arte:** Infográfico comparativo demonstrando o recorte entre a população geral com alguma deficiência (23,9%) e aquelas com deficiência severa (8,3%, representando pessoas com muita dificuldade ou incapacidade total). Apresenta a maior prevalência entre mulheres e o recorte regional: Estado do RJ (24,4%) e Cidade do Rio de Janeiro (24,7%, quase 1/4 da população carioca).  
> **Elementos Visuais:** Diagrama comparativo com dois blocos ou funil infográfico. Ícone sutil da Cidade do Rio de Janeiro contextualizando os 24,7%.  
> **Paleta Sugerida:** Azul escuro (#001F33), azul intermediário (#1565C0) e destaque em amarelo ouro ou ciano.  
> **Diretriz de Acessibilidade:** Textos explicativos nítidos acompanhando os números percentuais.

O levantamento ainda mostrou que existia uma tendência de que mulheres apresentassem maior incidência de casos de deficiência, o que pode ser explicado principalmente pelo envelhecimento da população, somado ao fato das mulheres serem mais longevas que os homens.

Em 2010, a região **Sudeste apresentava 23% da população** com, pelo menos, um tipo de deficiência, enquanto o **Estado do Rio de Janeiro contava com 24,4% da população**. No que se refere à **cidade do Rio de Janeiro**, o Instituto Pereira Passos lançou em junho de 2013, o *Cadernos do Rio: Pessoas com deficiência*, no qual afirmava que “quase ¼ dos habitantes da Cidade do Rio de Janeiro, ou 24,7% têm algum tipo de deficiência, em qualquer que seja o grau, seja ela física e/ou mental“[^4], apresentando um índice acima do nacional e do estadual.

No Censo 2022, vemos um cenário diferente. Embora o IBGE tenha mantido a utilização da metodologia do Washington Group, ela já apresentava mudanças na forma de classificar os tipos de deficiência, abrangendo **mais tipos**. Além disso, passou a levar em consideração apenas **casos graves e permanentes**, tirando casos moderados e temporários do cenário. 

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 03]**  
> **Título:** Censo IBGE 2022 — Nova Classificação e Metodologia Washington Group  
> **Descrição da Arte:** Quadro explicativo sobre a mudança de metodologia do Censo 2022: incorporação de novas perguntas e critérios mais restritivos do Washington Group. Passou a contabilizar exclusivamente casos graves e permanentes (excluindo temporários e moderados), além da divisão entre questionário básico e estendido.  
> **Elementos Visuais:** Matriz com os tipos avaliados (locomoção, visão, audição, cognição e autocuidado) e caixa de aviso sobre o critério de gravidade permanente.  
> **Paleta Sugerida:** Fundo neutro claro, bordas estruturadas em azul ardósia (#9DBDCE) e ícones semânticos.  
> **Diretriz de Acessibilidade:** Tipografia legível sem serifa; ícones com rótulos de texto explícitos.

Além da mudança metodológica em relação aos tipos e graus de severidade das deficiências, o IBGE também alterou a forma de aplicação das questões. Ele formulou dois tipos de questionários, um estendido, que constavam as perguntas sobre deficiências, e outro básico, que não constava, favorecendo casos de subnotificação. Prova disto é que do Censo de 2010 para o de 2022, houve uma queda considerável do número de pessoas com deficiência. **Somente na cidade do Rio de Janeiro, o percentual de pessoas com deficiência caiu de 24,7% para 6,9%.** 

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 04]**  
> **Título:** Comparativo Censo 2010 vs. 2022 — A Queda Estatística e a Subnotificação no Rio  
> **Descrição da Arte:** Gráfico de impacto mostrando a discrepância estatística decorrente da mudança de metodologia: queda do percentual de pessoas com deficiência na Cidade do Rio de Janeiro de 24,7% (2010) para 6,9% (2022), e cerca de 30 milhões a menos no Brasil. Alerta para o risco de subnotificação em políticas públicas frente ao envelhecimento populacional.  
> **Elementos Visuais:** Duas colunas comparativas para a Cidade do Rio: Barra 2010 (24,7%) vs Barra 2022 (6,9%), com anotação de 'Subnotificação Estatística' e dados da PNAD 2022 sobre salto de deficiências a partir dos 40 e 60 anos.  
> **Paleta Sugerida:** Azul marinho (#002B49) para 2010, cinza/azul suave para 2022 e linha de alerta âmbar (#92400E).  
> **Diretriz de Acessibilidade:** Incluir nota explicativa clara de que a queda reflete mudança de cálculo e não redução real da população que necessita de acessibilidade.

A nível nacional, a discrepância entre os censos era de cerca de **30 milhões de pessoas a menos**, segundo reportagem do Jornal Folha de São Paulo[^5]. Quando questionado, o IBGE afirmou que os números não eram comparáveis devido às mudanças metodológicas. Ainda assim, o caso serve como alerta para a subnotificação de casos que não sejam severos e permanentes, excluindo uma parcela importante da população que também deve ser considerada na hora de pensarmos políticas públicas de acessibilidade. 

A atenção a esta parcela da população fica ainda mais evidente quando nos deparamos com o fato de que o envelhecimento está diretamente ligado ao aumento de deficiências. Segundo a PNAD Contínua 2022[^6], a partir dos 40 anos de idade, existe um salto significativo no que diz respeito ao aumento de deficiências adquiridas, que se torna ainda maior a partir dos 60 anos.

Isso é especialmente delicado em relação à cidade do Rio de Janeiro, pois ela já é a segunda capital no ranking nacional de envelhecimento populacional[^7] (Censo IBGE 2022), perdendo apenas para Porto Alegre. Além disso, atualmente, o Rio de Janeiro é o Estado com menor taxa de fecundidade, o que favorece o envelhecimento populacional. O IBGE prevê que, a partir de 2028, a população do Estado do RJ comece a encolher[^8], ficando com mais pessoas acima dos 60 anos do que jovens abaixo dos 14 anos. Isso exige adaptações urgentes em áreas como saúde, assistência social e previdência, mas também novas formas de pensar o urbanismo, a mobilidade urbana, o acesso a serviços, à informação, ao lazer e à cultura. Afinal, toda a população tem direito à cidadania plena.

Desta forma, vemos que garantir os direitos das pessoas com deficiências graves e severas acaba beneficiando uma ampla parcela da sociedade. Pessoas que apresentam deficiências mais brandas ou moderadas, sejam elas permanentes ou não, também precisam contar com uma cidade que esteja preparada para atendê-las. A **acessibilidade** e a **inclusão** geram um efeito cascata, impactando positivamente na qualidade de vida, na economia e no desenvolvimento social coletivo. 

### Direitos das Pessoas com Deficiência

A *Convenção sobre os Direitos das Pessoas com Deficiência da ONU* (2006) foi o primeiro tratado internacional a reconhecer a importância do respeito à diferença, do direito à autonomia e à liberdade de escolhas da pessoa com deficiência. Ao mesmo tempo, essa convenção ressaltava a urgência da igualdade de oportunidades, visando garantir a efetiva participação e inclusão na sociedade, atuando como um norteador na promoção, formulação e avaliação de políticas, planos, programas e ações em níveis regional, nacional e internacional.

Dois anos depois, em 2008, o Brasil ratificou a Convenção com status de Emenda Constitucional. “Na prática, é como se Constituição Federal tivesse um capítulo inteiro dedicado às pessoas com deficiência. Foi o primeiro tratado internacional recepcionado pelo nosso país nessa condição”.[^9] 

Em 2015, o Brasil instituiu a *Lei Brasileira de Inclusão da Pessoa com Deficiência*, também conhecida como *Estatuto da Pessoa com Deficiência*, “(...) destinada a assegurar e a promover, em condições de igualdade, o exercício dos direitos e das liberdades fundamentais por pessoa com deficiência, visando à sua inclusão social e cidadania”[^10].

Dentre os direitos assegurados pela lei estão o **direito à vida, à saúde, ao trabalho, à cultura e ao lazer, à mobilidade e também direito de acesso à informação e comunicação**, que são essenciais para o exercício pleno da cidadania.

Mas a garantia de direitos pressupõe uma concepção de acessibilidade que ultrapasse a simples eliminação de barreiras físicas, abrangendo os diferentes contextos nos quais as pessoas participam da vida em sociedade. E é justamente neste contexto que aparecem as sete dimensões da acessibilidade.

### Tipos de Acessibilidade

Na *Lei Brasileira de Inclusão* acessibilidade  é definida como: 

(...) possibilidade e condição de alcance para utilização, com segurança e autonomia, de espaços, mobiliários, equipamentos urbanos, edificações, transportes, informação e comunicação, inclusive seus sistemas e tecnologias, bem como de outros serviços e instalações abertos ao público, de uso público ou privados de uso coletivo, tanto na zona urbana como na rural, por pessoa com deficiência ou com mobilidade reduzida[^11].

Para garantir a autonomia das pessoas com deficiência, é imprescindível garantir acessibilidade que, segundo o autor Romeu Kazumi Sassaki, se divide em **sete dimensões[^12]:**

Em contrapartida, as **barreiras** são todos os tipos de impeditivos a essa segurança e autonomia da pessoa com deficiência, podendo ser urbanísticas, arquitetônicas, nos transportes, nas comunicações/informações, na tecnologia e atitudinais. A fim de evitar ao máximo essas barreiras, o governo federal recomenda o uso de **desenhos universais**[^13], ou seja, projetar produtos, serviços e ambientes que possam ser utilizados por todas as pessoas, sem necessidade de adaptação. Mas, caso isso não seja possível, deve-se realizar os ajustes necessários para que todas as pessoas possam usufruir da forma mais equitativa possível.

O autor Romeu Kazumi Sassaki contribui para ampliar a compreensão sobre o tema, trazendo a acessibilidade em **sete dimensões[^14]:**

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 05]**  
> **Título:** As 7 Dimensões da Acessibilidade (Romeu Kazumi Sassaki)  
> **Descrição da Arte:** Diagrama conceitual integrando as sete dimensões de acessibilidade: 1. Arquitetônica (espaços físicos); 2. Comunicacional (linguagem simples, legendas, LIBRAS); 3. Metodológica (processos e métodos); 4. Instrumental (softwares e dispositivos); 5. Programática (leis e políticas); 6. Atitudinal (eliminação de preconceitos); 7. Digital/Tecnológica (serviços web e sistemas).  
> **Elementos Visuais:** Diagrama radial/circular com o cidadão ao centro e as 7 dimensões interligadas com ícones modernos.  
> **Paleta Sugerida:** Tons harmoniosos da identidade visual do Rio: azul primário, ciano, verde esmeralda e ardósia.  
> **Diretriz de Acessibilidade:** Cada dimensão deve conter ícone vetorial e um pequeno subtítulo explicativo com alto contraste.

Suas sete dimensões permitem relacionar os princípios de igualdade, autonomia, participação e inclusão presentes na *Convenção sobre os Direitos das Pessoas com Deficiência* e na *Lei Brasileira de Inclusão* a aspectos concretos da vida cotidiana. Desta forma, a perspectiva de Sassaki é utilizada neste trabalho como uma referência conceitual para compreender a acessibilidade de forma abrangente e identificar diferentes frentes nas quais barreiras podem ser eliminadas ou reduzidas, e não como uma classificação normativa estabelecida pelo ordenamento jurídico brasileiro.  
Ao transpor essa questão para a acessibilidade digital, vemos que ela não se restringe à adequação técnica de websites, aplicativos ou sistemas, mas envolve a identificação e a eliminação de diferentes barreiras que podem dificultar o acesso à informação e aos serviços.  
A dimensão comunicacional, por exemplo, relaciona-se diretamente à necessidade de que conteúdos digitais sejam apresentados de forma compreensível e acessível, considerando o uso de linguagem simples. A dimensão instrumental, por sua vez, aproxima-se das condições de acesso e utilização de dispositivos, softwares e recursos tecnológicos. A dimensão programática, relaciona-se às políticas, normas e procedimentos institucionais que orientam a oferta de serviços acessíveis, sendo especialmente relevante no âmbito do poder público. Já a dimensão atitudinal está relacionada à superação de preconceitos e à adoção de uma cultura institucional que reconheça a acessibilidade como um direito e não como uma adaptação excepcional.  
Deste modo, as dimensões de Sassaki contribuem para ampliar a compreensão da acessibilidade digital ao evidenciar que as barreiras não estão necessariamente localizadas apenas na tecnologia utilizada, mas podem estar presentes na comunicação, nos processos, nas atitudes, nas políticas institucionais e nas próprias condições de acesso. Essa perspectiva é particularmente relevante para os serviços públicos digitais, nos quais a acessibilidade deve ser considerada desde a concepção do serviço até sua utilização pelo cidadão. 

### Acessibilidade Digital: entendendo o conceito

Na *Lei Brasileira de Inclusão*, está prevista a acessibilidade digital, que é a eliminação de barreiras na Web. Ela determina que todo tipo de página web seja projetada de modo que todas as pessoas possam perceber, entender, navegar e interagir de maneira efetiva.

É obrigatória a acessibilidade nos sítios da internet mantidos por empresas com sede ou representação comercial no País ou por órgãos de governo, para uso da pessoa com deficiência, garantindo-lhe acesso às informações disponíveis, conforme as melhores práticas e diretrizes de acessibilidade adotadas internacionalmente.[^15] 

Embora a lei afirme que também abarca empresas privadas com sede no Brasil, a acessibilidade digital é ainda mais urgente quando falamos de serviços públicos, pois sua ausência acaba ferindo princípios constitucionais como a igualdade (não discriminação e igualdade de condições), cidadania (pois deixa de ter acesso a direitos fundamentais) e legalidade (não estando em conformidade com Estatuto da Pessoa com Deficiência).

No Brasil, ainda existem barreiras significativas à acessibilidade digital que vão muito além de simplesmente ter ou não acesso à internet. Uma pesquisa recente da [BigDataCorp](https://mwpt.com.br/metodologia-utilizada-no-estudo-de-acessibilidade-em-sites-ativos-brasil-2024/) em parceria com Movimento Web para Todos (WPT)[^16], realizada em 2024, analisou sites brasileiros quanto à facilidade de navegação para pessoas com deficiência. Para os testes, foram escolhidos como parâmetros: a acessibilidade de imagens, links e formulários, além de verificação de código HTML para conferir se estava de acordo com as especificações da W3C. 

Mais de 30 milhões de sites brasileiros, corporativos e privados, foram verificados. Os sites inativos foram desconsiderados nesta pesquisa, restando 26,3 milhões de sites nacionais.

No que se refere aos resultados, apenas 2,42% dos sites tiveram sucesso em relação aos critérios do W3C no código HTML; 16,02% tinham acessibilidade de links; 42,83% possuíam descrição de imagens; e 50,41% possuíam formulários acessíveis. 

O resultado mostra que 2,9% dos sites passaram sem erros nas verificações propostas. Isso significa que todas as páginas verificadas neste site passaram nos testes. Um número grande de sites registrou falha em ao menos uma parte dos testes (aproximadamente 97,13%).[^17]

**O mais impactante da pesquisa é o fato de 89,96% dos sites governamentais não atenderem aos critérios mínimos definidos pela pesquisa.**

Sabemos que, no setor público, muitas são as situações de entrave à acessibilidade. Primeiramente, a grande quantidade de sistemas legados, que muitas vezes não estão preparados para o uso de tecnologias assistivas. Já no caso de projetos novos, é muito comum que as equipes tratem a acessibilidade como algo a ser corrigido depois que o site ou aplicativo já está pronto, em vez de considerá-la desde o início do projeto. Essa abordagem torna a correção de problemas estruturais mais difícil e, muitas vezes, mais cara, o que também dificulta as correções.

Esse cenário é agravado pelo baixo conhecimento técnico sobre o tema, pela pouca participação de pessoas com deficiência no desenvolvimento dos projetos e nos testes com usuários, pelos orçamentos limitados, pela pressão para cumprir prazos de lançamento e pela fiscalização insuficiente no que diz respeito ao cumprimento dos requisitos de acessibilidade. Como resultado, a acessibilidade muitas vezes não é tratada como prioridade, não atuando como um requisito fundamental de qualidade do produto ou serviço digital.

Por outro lado, também temos um quadro de defasagem em relação ao uso de tecnologias por vários grupos, especialmente idosos, pessoas com deficiência, pessoas com baixa escolaridade e de áreas rurais. O 	que também dificulta o acesso à serviços públicos digitais, fazendo com que a transformação digital de serviços ainda seja uma realidade distante daqueles que mais precisam.

### Uso de Serviços Públicos Digitais

O último levantamento do Banco Interamericano de Desenvolvimento (BID) sobre o uso de serviços digitais no Brasil[^18], publicado em 2025, evidencia que a disponibilidade de dispositivos e de conexão não significa, necessariamente, capacidade de utilização autônoma das tecnologias. 

Embora cerca de 94,2% dos entrevistados possuíssem telefone celular com acesso a dados móveis, alguns grupos, como pessoas idosas, pessoas com deficiência, indivíduos com baixa escolaridade e moradores de áreas rurais, ainda apresentavam defasagens significativas no uso da internet, incluindo percentuais de não utilização. Entre os principais fatores identificados estava a baixa adaptação digital, relacionada à dificuldade ou à falta de confiança para realizar determinadas atividades sem o auxílio de outra pessoa. 

Tentando avaliar o grau de adaptação dos grupos, a pesquisa listava algumas tarefas rotineiras[^19], como instalar um aplicativo no celular, fazer uma busca por palavra-chave ou enviar um e-mail com anexo, e perguntava se a pessoa se sentia confiante de realizá-las.

A pesquisa mostrou que a média de entrevistados que demonstrava autoconfiança[^20] para realizar atividades digitais sem ajuda de outra pessoa era de apenas 47,5%. “Essa confiança é ainda mais baixa entre pessoas com mais de 55 anos (24,0% das habilidades), indivíduos com ensino fundamental (26,7%), moradores de áreas rurais (36,6%) e pessoas com deficiência (24,2%)”[^21]. 

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 06]**  
> **Título:** Pesquisa BID 2025 — Autoconfiança no Uso de Serviços Públicos Digitais  
> **Descrição da Arte:** Gráfico baseado na pesquisa do Banco Interamericano de Desenvolvimento (BID, 2025): demonstra que mesmo com 94,2% de celulares conectados, a média de autoconfiança digital é de apenas 47,5%. A confiança cai para 24,2% entre pessoas com deficiência, 24,0% em idosos (+55 anos) e 26,7% em baixa escolaridade. 57,2% prefeririam atendimento presencial por insegurança no digital.  
> **Elementos Visuais:** Gráfico de barras horizontais contrastando a média geral (47,5%) com as populações mais vulneráveis (24%), com destaque para a frase-chave sobre autonomia.  
> **Paleta Sugerida:** Azul cobalto (#004A80), vermelho/coral de alerta para barreiras e verde para autonomia.  
> **Diretriz de Acessibilidade:** Indicar percentuais numéricos de forma clara e visível dentro ou ao lado de cada barra.

Essa desigualdade na adaptação digital também se refletiu diretamente na utilização de serviços públicos digitais. Quando questionados sobre o uso desses serviços no ano anterior, 42,8% dos entrevistados afirmou ter acessado serviços digitais pelo menos uma vez e os grupos que enfrentaram maior dificuldade de uso foram justamente aqueles que tinham menos adaptação digital. 

As três principais alegações eram: a falta de experiência com serviços digitais (15,3%); dúvida sobre a validade do serviço digital (14,9%); e o fato de gostarem de interagir com um funcionário público (9,5%). Além disso, 57,2% afirmaram que se voltassem a utilizar o mesmo serviço, **iriam preferir o atendimento presencial**[^22]. 

Os resultados demonstram que a ampliação do acesso à internet e aos dispositivos tecnológicos não é suficiente para garantir a inclusão digital. A presença da tecnologia no cotidiano não elimina, por si só, as barreiras que dificultam sua utilização autônoma, especialmente entre grupos que apresentam menor familiaridade, confiança ou capacidade de interação com os recursos digitais. 

Por este motivo, pensar em acessibilidade digital significa ir além da disponibilidade tecnológica e considerar as diferentes necessidades dos cidadãos durante a interação com sistemas, plataformas e serviços. Trata-se, portanto, de uma estratégia fundamental para ampliar o acesso e a navegabilidade de pessoas que ainda encontram barreiras nesse ambiente, seja em razão de deficiências físicas, intelectuais ou cognitivas, da baixa escolaridade, da idade avançada ou mesmo da pouca familiaridade com as tecnologias. 

Quando plataformas governamentais não são acessíveis, a transformação digital pode, paradoxalmente, ampliar desigualdades existentes ao transferir para o cidadão o ônus de superar barreiras que deveriam ser eliminadas pelo próprio serviço. 

A acessibilidade digital é, acima de tudo, uma forma de garantir uma navegação mais simples, previsível, objetiva e orgânica, possibilitando um acesso mais amplo e de maior qualidade, visando a **autonomia, inclusão e o direito fundamental** **à informação, comunicação e acesso à serviços** que podem melhorar consideravelmente a qualidade de vida da população.

### Tipos de deficiência e acessibilidade digital

#### **Deficiência Visual:**

1) #### **Cegueira:** Perda total ou quase total da visão, não corrigível por óculos ou cirurgia.

   ### Principais dificuldades de uso

* Imagens, ícones, tabelas, mapas e gráficos sem descrição adequada  
* Botões, links e campos de formulário sem identificação acessível  
* Navegação incompatível com leitores de tela  
* Elementos que dependem exclusivamente de interação visual  
* Mensagens de erro, alertas e mudanças na tela que não são captados pelo leitor de tela  
    
  Boas práticas:   
* Utilizar HTML semântico e estrutura lógica de títulos, listas e formulários  
* Fornecer textos alternativos adequados para imagens e outros conteúdos visuais  
* Garantir compatibilidade com leitores de tela  
* Permitir a navegação e interação por teclado  
* Testar o serviço com tecnologias assistivas e com pessoas cegas

2) #### **Baixa visão:** Redução significativa da capacidade visual, sem possibilidade de melhora mesmo com uso de óculos ou com cirurgia.

   Principais dificuldades de uso:

* Textos e elementos muito pequenos ou difíceis de ampliar  
* Baixo contraste entre texto, ícones e fundo  
* Interfaces não responsivas, que perdem conteúdo ou funcionalidade quando ampliadas  
* Elementos interativos muito próximos ou difíceis de identificar  
* Informações apresentadas apenas por características visuais, como tamanho, posição ou contraste

  ### Boas práticas:

* Garantir contraste adequado entre texto, elementos e fundo  
* Permitir ampliação do conteúdo sem perda de informação ou quebra de layout  
* Utilizar tamanhos de texto e elementos interativos adequados  
* Manter uma organização visual clara, com boa hierarquia e espaçamento  
* Evitar informações que dependam exclusivamente de características visuais

3) #### **Daltonismo**: Alteração na percepção das cores devido ao funcionamento ou ausência dos cones da retina, células responsáveis por identificar as cores. O daltonismo pode ser de quatro tipos:

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 07]**  
> **Título:** Simulação Visual de Daltonismo — Espectro de Cores  
> **Descrição da Arte:** Infográfico demonstrativo do espectro de cores visível para pessoas com diferentes tipos de daltonismo: Visão Tricromata (Normal), Protanopia (ausência de cones vermelhos), Deuteranopia (ausência de cones verdes), Tritanopia (dificuldade com azul/amarelo) e Acromatopsia (monocromática / escala de cinza).  
> **Elementos Visuais:** Barras horizontais paralelas exibindo o arco-íris comparado em cada uma das condições.  
> **Paleta Sugerida:** Espectros simulados de Protanopia, Deuteranopia e Tritanopia com legendas descritivas.  
> **Diretriz de Acessibilidade:** Apresentar rótulos textuais nítidos para cada espectro, permitindo que a diferença seja compreendida mesmo sem visualização colorida.

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 08]**  
> **Título:** Boas Práticas de Interface para Daltonismo: Não Dependa Apenas da Cor  
> **Descrição da Arte:** Exemplo prático de componente de interface (formulário / status / gráfico) mostrando a abordagem incorreta (diferenciação baseada somente em cor verde/vermelho) versus a abordagem acessível (reforço simultâneo com ícones ✓ e ✕, texto descritivo e textura de traço).  
> **Elementos Visuais:** Layout 'Antes vs Depois' ou 'Evite vs Prefira' com cards lado a lado.  
> **Paleta Sugerida:** Cores de interface com contornos definidos e ícones pretos/brancos de suporte.  
> **Diretriz de Acessibilidade:** Excelente exemplo didático para designers e desenvolvedores front-end.

Principais dificuldades de uso:

* Informações transmitidas exclusivamente por meio de cores.  
* Gráficos e diagramas que diferenciam dados apenas pela cor.  
* Mensagens de erro ou sucesso identificadas somente por cores.  
* Links e elementos interativos diferenciados apenas pela mudança de cor.  
* Combinações de cores com pouco contraste ou difíceis de distinguir.

  ### Boas práticas:

* Nunca utilizar a cor como único meio de transmitir uma informação.  
* Combinar cores com textos, ícones, formas ou outros recursos visuais.  
* Utilizar contraste adequado entre os elementos.  
* Adotar paletas de cores que considerem diferentes formas de daltonismo.

#### 

#### **Deficiência Auditiva:**

1) #### **Surdez total ou parcial:** Essa condição pode afetar a percepção dos sons e, em diferentes graus, a comunicação oral.

   Principais dificuldades de uso:  
* Vídeos e conteúdos audiovisuais sem legendas.  
* Informações importantes transmitidas exclusivamente por áudio.  
* Ausência de tradução ou interpretação em Libras, quando necessária.  
* Alertas, notificações e mensagens de erro apresentados apenas por sons.  
* Conteúdos com linguagem complexa ou pouco acessível para pessoas que têm a Libras como primeira língua.  
    
  Boas práticas:  
* Disponibilizar legendas para vídeos e outros conteúdos com informação sonora.  
* Não depender exclusivamente de sons para transmitir informações importantes, utilizando também recursos visuais.  
* Disponibilizar Libras quando o contexto e o público justificarem esse recurso.  
* Fornecer transcrições para conteúdos predominantemente em áudio.  
* Utilizar linguagem clara e objetiva, com boa organização visual das informações.

  

#### **Deficiência Intelectual / Cognitiva:**

	No caso de deficiências intelectual e cognitiva, as dificuldades e boas práticas costumam se repetir em cada um dos tipos de deficiência. Para que a lista não ficasse extensa e repetitiva, foram citados pontos diferentes, tentando abarcar o maior número possível de boas práticas e dificuldades.

1) #### **Deficiência intelectual:** Condição caracterizada por limitações no funcionamento intelectual e nas habilidades adaptativas (como comunicação, aprendizagem, autonomia e interação social).

   Principais dificuldades de uso:  
* Textos longos, complexos ou com linguagem excessivamente técnica.  
* Interfaces com muitas informações ou elementos apresentados ao mesmo tempo.  
* Instruções pouco claras ou que exigem muitas etapas para realizar uma tarefa.  
* Navegação inconsistente, em que os elementos mudam de posição ou comportamento inesperadamente.  
* Mensagens de erro pouco claras, que não explicam o problema e como resolvê-lo.  
    
  Boas práticas:  
* Utilizar linguagem simples, clara e objetiva  
* Organizar as informações em pequenas partes, com títulos e hierarquia visual bem definidos.  
* Apresentar instruções claras e dividir tarefas complexas em etapas menores.  
* Manter padrões consistentes de navegação, layout e funcionamento dos elementos.  
* Fornecer mensagens de erro claras, indicando o que aconteceu e como o usuário pode corrigir o problema.

2) #### **Transtorno** **do Espectro Autista (TEA):** Condição do neurodesenvolvimento que pode influenciar a comunicação, a interação social, o processamento de informações e a forma como a pessoa percebe e responde ao ambiente.

   Principais dificuldades de uso:

* Excesso de estímulos visuais  
* Sons inesperados ou reprodução automática de áudio e vídeo.  
* Interfaces com mudanças inesperadas de layout, navegação ou funcionamento.  
* Instruções ambíguas, linguagem figurada ou informações pouco objetivas.  
* Processos complexos, com muitas etapas ou que exigem respostas rápidas.  
    
  Boas práticas:   
* Evitar animações, movimentos e estímulos visuais desnecessários, oferecendo a possibilidade de interrompê-los.  
* Não reproduzir áudio ou vídeo automaticamente e permitir o controle sobre sons e animações.  
* Manter a interface previsível e consistente, evitando mudanças inesperadas.  
* Utilizar linguagem simples, objetiva e direta, evitando ambiguidades quando elas não forem necessárias.  
* Permitir que o usuário tenha tempo suficiente para compreender as informações e concluir as tarefas, evitando limites de tempo desnecessários.

3) #### **Transtorno do Déficit de Atenção/hiperatividade (TDAH):** Caracterizada por padrões persistentes de desatenção, hiperatividade e/ou impulsividade que podem impactar o aprendizado, o trabalho, a organização e as atividades do dia a dia.

   Principais dificuldades de uso:

* Interfaces com excesso de informações, elementos ou estímulos simultâneos.  
* Textos longos e pouco estruturados, que dificultam a localização das informações importantes.  
* Animações, notificações e outros elementos que desviam a atenção durante uma tarefa.  
* Processos longos, com muitas etapas ou que exigem que o usuário memorize informações.  
* Limites de tempo muito curtos para concluir tarefas ou preencher formulários.

  Boas práticas:

* Utilizar interfaces sem poluição visual, organizadas e visualmente hierarquizadas, destacando as informações mais importantes.  
* Dividir conteúdos extensos em seções menores, utilizando títulos, listas e outros recursos de organização.  
* Evitar distrações desnecessárias e permitir que animações e notificações sejam desativadas.  
* Reduzir a necessidade de memorização, fornecendo instruções e informações relevantes no momento em que são necessárias.  
* Oferecer tempo suficiente para realizar tarefas e, sempre que possível, permitir que o usuário pause ou retome um processo.

4) #### **Dislexia:** Dislexia é um transtorno específico de aprendizagem com causas de influência genética, neurobiológica e ambiental que interagem ao longo do desenvolvimento. 

   Principais dificuldades:  
* Textos longos, densos ou com linguagem excessivamente complexa.  
* Blocos de texto sem espaçamento ou organização visual adequada.  
* Fontes pequenas, pouco legíveis ou com pouco contraste.  
* Interfaces que exigem leitura rápida ou memorização de muitas informações.  
* Formulários e instruções pouco claros ou que não permitem identificar facilmente as informações principais.

  Boas práticas:

* Utilizar linguagem simples  
* Destacar visualmente as informações mais importantes e manter uma hierarquia clara de conteúdo.  
* Oferecer alternativas ao conteúdo textual, como áudio, vídeos com narração ou recursos de leitura em voz alta  
* Fonte sem serifa e simples ou fontes exclusivas para dislexia (OpenDyslexic, Dyslexie ou Lexia Readable) 

## **Boas práticas de Acessibilidade Digital**

Antes de falarmos das diretrizes de acessibilidade, precisamos ressaltar alguns pontos que são essenciais para desenvolver serviços públicos de qualidade. O primeiro deles é ter em vista que a maior parte da população brasileira tem acesso à internet pelo celular, muitas vezes, essa é a única forma de acesso. Por isso, os serviços devem ser desenvolvidos para funcionar adequadamente em diferentes tamanhos de tela, o que reforça a importância do design responsivo e da adoção da estratégia mobile first. 

Mobile-first é uma abordagem delineada em 2009 por Luke Wroblewski. De forma simples, o mobile-first é uma abordagem para o design responsivo: primeiro design para telas menores, e depois adicione mais recursos e conteúdo conforme as telas ficam maiores.  
Esta abordagem de design também é conhecida como “aprimoramento progressivo”. O movimento inverso, ou “degradação graciosa”, implica projetar para um site totalmente funcional para Desktop, e então adaptar o conteúdo para telas menores a partir daí.[^23]

Considerar diferentes dispositivos e formas de acesso, no entanto, é apenas uma das dimensões necessárias para garantir que um serviço digital possa ser utilizado pelo maior número possível de pessoas. É preciso também considerar as diferentes capacidades e necessidades dos usuários durante a navegação e o acesso aos conteúdos. 

É neste contexto que entram as Diretrizes de Acessibilidade para Conteúdo Web 2\.2[^24], que são o padrão mais atualizado de acessibilidade digital. Essas diretrizes são desenvolvidas pelo World Wide Web Consortium (W3C), em parceria com pessoas e organizações de todo o mundo e estão em conformidade com os modelos anteriores (WCAG 2.0 e WCAG 2.1). O objetivo é estabelecer um padrão comum para tornar o conteúdo da web mais acessível e atender às necessidades de pessoas, organizações e governos. 

Em 2005, o Governo Federal brasileiro criou o Modelo de Acessibilidade em Governo Eletrônico (eMAG)[^25], tendo como principal objetivo garantir a acessibilidade dos conteúdos e serviços digitais públicos, eliminando ou, pelo menos, reduzindo barreiras que pudessem dificultar o acesso e a utilização por pessoas com deficiência. O eMAG foi baseado no WCAG 1.0, bem como normas e diretrizes de países como EUA, Canadá, Irlanda, Portugal e Espanha. Sua primeira versão, o eMAG 1.4 foi elaborada pelo Departamento de Governo Eletrônico, em parceria com a ONG Acessibilidade Brasil, e disponibilizada para o público em janeiro de 2005\. A versão mais recente do eMAG (Modelo de Acessibilidade em Governo Eletrônico) é a versão 3.1, lançada em abril de 2014\.

Após esta data, não houve nenhum tipo de atualização do eMAG, apenas o lançamento das Normas ABNT 17060[^26] e 17225[^27], esta última, especificamente para adequação ao WCAG 2.2. Isso não significa que o eMAG 3.1 tenha deixado de ser útil, ele continua sendo uma referência específica para o contexto do governo brasileiro. O problema é que a ausência de uma revisão faz com que ele não acompanhe integralmente a evolução das tecnologias e das necessidades de acessibilidade.

A WCAG 2.2 continua sendo a versão mais completa e atualizada que temos sobre o tema. Devido a isto, foi escolhida para balizar as boas práticas de acessibilidade deste guia. Seus três níveis estabelecem parâmetros de comparação entre os padrões de acessibilidade, sendo eles: 

* **nível A (padrão mínimo):** elimina as barreiras de acessibilidade mais críticas, ou seja, sem esses critérios mínimos de acessibilidade, alguns usuários podem ficar impossibilitados de acessar o conteúdo. 

* **nível AA (recomendado):** Atende a um conjunto mais amplo de necessidades e reduz significativamente as principais barreiras. É o nível geralmente utilizado como **referência para conformidade de sites e serviços digitais**. 

* **nível AAA (padrão ideal):** Representa o grau mais rigoroso de acessibilidade, incorporando requisitos adicionais. Nem sempre é possível ou adequado atingir AAA para todo o conteúdo. 

Além dos níveis, o padrão de acessibilidade da WCAG é estruturado em quatro princípios básicos[^28] (conhecidos pela sigla **POUR**):

1. **Perceptível:** as informações e os componentes da interface do usuário devem ser apresentados aos usuários de forma que eles possam percebê-los. 

2. **Operável:** os componentes da interface do usuário e a navegação devem ser operáveis, ou seja, a interface não pode exigir interação que o usuário não consiga realizar.

3. **Compreensível:**  os usuários devem ser capazes de compreender as informações, bem como o funcionamento da interface do usuário (o conteúdo ou o funcionamento não podem estar além da sua compreensão).

4. **Robusto:** os usuários devem ser capazes de acessar o conteúdo à medida que as tecnologias avançam (conforme as tecnologias e os agentes de usuário evoluem, o conteúdo deve permanecer acessível). 

Esses princípios se dividem em diretrizes que, por sua vez, se desdobram em critérios de sucesso. As **diretrizes** têm como objetivo principal garantir que o conteúdo seja acessível ao maior número possível de pessoas e que possa ser apresentado em múltiplos formatos, sendo capaz de se adequar às diferentes capacidades sensoriais, físicas e cognitivas das pessoas. Em cada diretriz, existem **critérios de sucesso,** que são responsáveis por descrever o que deve ser feito para estar em conformidade com esse padrão de acessibilidade. 

A W3C também disponibiliza em seu site: tutoriais, dicas de design acessível, dicas para desenvolvimento, formas de testar e avaliar a acessibilidade, entre outras funcionalidades. Neste sentido, o site também serviu como parâmetro para traçar indicações mais práticas para este guia, complementando as diretrizes gerais e os critérios de sucesso da WCAG. 

A partir dessas referências, o guia reúne e organiza boas práticas de acessibilidade digital com o objetivo de oferecer um material prático e orientador para órgãos e secretarias municipais na criação e na revisão de seus portais web, contribuindo para a **redução de barreiras de acesso e para uma experiência digital mais autônoma e inclusiva**. 

### Apresentação do conteúdo textual:

#### Orientações gerais:

O conteúdo em texto e todas as instruções fornecidas para compreendê-lo não podem depender somente de características sensoriais dos componentes, tais como: **forma, cor, tamanho, localização visual, orientação ou som**. Isso garante que ele seja inteligível à maioria da população.

Além disso, o Governo Federal prevê a utilização de **Linguagem Simples**, já que acessibilidade também consiste em garantir que um texto possa ser compreendido por todos.

1. [**Parágrafos:**](https://www.w3.org/WAI/tutorials/page-structure/content/#paragraphs)

* Para que o leitor de tela siga corretamente o fluxo de um parágrafo para o outro, o principal é usar a estrutura semântica correta do HTML. Cada parágrafo deve estar dentro de uma tag \<p\>.

* Não é recomendado utilizar a tag \<br\>, porque semanticamente é um único parágrafo com várias quebras de linha.

* Também não é recomendado fazer nenhum indicativo de próximo parágrafo. Caso o parágrafo seguinte estiver com a tag \<p\>, o leitor de tela fará a leitura normalmente.

* Além disso, se houver títulos, listas, tabelas, imagens e outros elementos, mantenha a hierarquia semântica com a indicação das tags correspondentes.

2. [**Tamanho de fonte e redimensionamento de texto:**](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#resize-text)

   A WCAG não determina um tamanho de fonte, no entanto, boas práticas de design indicam o **tamanho 16 como o mínimo**. Além disso, a questão do redimensionamento torna-se essencial para garantir a legibilidade.

* O texto (exceto legenda ou imagem de texto) deve poder ser redimensionado 200%, sem apresentar perda de conteúdo ou de funcionalidade.

3. [**Alinhamento de texto:**](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#visual-presentation)

* A largura do bloco de texto não tem mais do que 80 caracteres ou glifos (40 se CJK)

* O bloco de texto **não deve** ser justificado (alinhado a ambas as margens esquerda e direita). 

* Para idiomas que são lidos da esquerda para a direita, o alinhamento deve ser à esquerda, como é o caso do português.

* Para idiomas que são lidos da direita para a esquerda, o alinhamento deve ser à direita.

4. [**Realinhamento e rolagem de tela:**](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#reflow)

* O conteúdo pode ser apresentado sem perda de informação ou funcionalidade e sem exigir rolagem em duas dimensões para:

  * Conteúdo de rolagem vertical com largura equivalente a 320 pixels CSS;

  * Conteúdo de rolagem horizontal com altura equivalente a 256 pixels CSS.

  * Exceto para partes do conteúdo que requerem layout bidimensional para uso ou significado.

* 320 pixels CSS equivalem a uma largura de janela de exibição (viewport) inicial de 1.280 pixels de largura, com zoom de 400%. 

* Para conteúdo da Web projetado para rolar horizontalmente (por exemplo, com texto vertical), os 256 pixels CSS equivalem a uma altura inicial da janela de exibição de 1024px com zoom de 400%. 

* Exemplos de conteúdo que exigem layout bidimensional são imagens necessárias para compreensão (como mapas e diagramas), vídeos, jogos, apresentações, tabelas de dados (não células individuais) e interfaces onde seja necessário manter as barras de ferramentas em exibição ao manipular o conteúdo. É aceitável fornecer rolagem bidimensional para tais partes do conteúdo. 

5. [**Espaçamento de texto:**](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#text-spacing)

   Os espaçamentos devem ser calculados levando em consideração o tamanho da fonte do texto. O layout do site deve suportar esses ajustes sem quebrar.

* Espaçamento entre linhas de pelo menos 1,5 vezes o tamanho da fonte;

* Espaçamento entre os parágrafos subsequentes de pelo menos 2 vezes o tamanho da fonte;

* Espaçamento entre letras de pelo menos 0,12 vezes o tamanho da fonte;

* Espaçamento entre palavras de pelo menos 0,16 vezes o tamanho da fonte.

6. [**Contraste textual:**](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#contrast-minimum) 

* Para o nível AA, o contraste textual e de imagens de texto é, no mínimo,  4.5:1. Para o texto ampliado ou imagem de texto grande, o contraste mínimo é de 3:1.

* Para checar o contraste das páginas, sugerimos a utilização de ferramentas como:

  * Verificador de contraste da  [WebAIM](https://webaim.org/resources/contrastchecker/)

  * Color contrast checker da [Adobe](https://color.adobe.com/create/color-contrast-analyzer)

* Textos ou imagens que são meramente decorativos não possuem requisitos mínimos de contraste.

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 09]**  
> **Título:** Contraste Textual Mínimo — Diretrizes WCAG AA (4.5:1 e 3:1)  
> **Descrição da Arte:** Demonstração visual das relações mínimas de contraste exigidas pela WCAG 2.2 Nível AA: 4.5:1 para texto normal e 3:1 para texto grande (18pt ou 14pt negrito). Comparativo com contraste insuficiente (reprovado) e contraste ampliado AAA (7:1).  
> **Elementos Visuais:** Cards de amostra tipográfica com indicador de medição de contraste e carimbo de 'Aprovado AA' ou 'Reprovado'.  
> **Paleta Sugerida:** Exemplos com fundo branco (#FFFFFF) e fundos escuros (#0F172A), demonstrando ambos os modos.  
> **Diretriz de Acessibilidade:** Indicar o valor numérico exato do cálculo de luminância em cada amostra.
 

* Logotipos não possuem requisitos mínimos de contraste.

7. [**Contraste não textual:**](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#non-text-contrast)

* Para o nível AA, o contraste mínimo entre componentes de interface ou objetos gráficos e cores adjacentes deve ser de 3:1.

* Como exemplo temos mudanças de estado (grifos ao passar o mouse, clicar no botão, etc) ou qualquer tipo de informação gráfica.

8. [**Uso de cores:**](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#use-of-color)

* A cor não pode ser utilizada como o **único meio visual** de transmitir informações, indica uma ação, pedir uma resposta ou distinguir um elemento visual.

* Nestes casos, ela precisa vir acompanhada de uma indicação textual.

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 10]**  
> **Título:** Comunicação Multissensorial — Informação Além da Cor  
> **Descrição da Arte:** Exemplo de como transmitir mensagens essenciais, alertas de sistema e gráficos utilizando cor combinada com tipografia, ícones e formas geométricas, cumprindo a diretriz WCAG 1.4.1.  
> **Elementos Visuais:** Trio de status (Sucesso, Atenção, Erro) exibindo simultaneamente: cor + ícone semântico + rótulo textual.  
> **Paleta Sugerida:** Verde esmeralda, amarelo âmbar e vermelho carmim sobre superfícies adequadas.  
> **Diretriz de Acessibilidade:** Demonstrar que o usuário com qualquer alteração visual consegue entender a ação imediatamente.

9. [**Indicação de link:**](https://www.w3.org/WAI/tips/writing/#make-link-text-meaningful)

* Links como “saiba mais”, “clique aqui” ou “leia mais” não conseguem indicar para uma pessoa com deficiência visual o assunto tratado. O ideal é que o **próprio título do documento, artigo ou site seja o link.**

  Ex.:  Fornecer um texto de link que descreva a finalidade de um link

* Para um título que também é um link, o ideal é usar um elemento \<a\> envolvendo o título no código HTML. O leitor de tela será capaz de perceber que se trata de um link.

10. [**Formulários:**](https://www.w3.org/WAI/tutorials/forms/)

    Além das considerações técnicas, os usuários geralmente preferem formulários simples e curtos. Solicite apenas o necessário para concluir a transação ou o processo; se forem solicitados dados irrelevantes ou excessivos, é mais provável que os usuários abandonem o formulário. 

* **Controles de rotulagem:** 

  * use o \<label\> elemento

  * em casos específicos, outros mecanismos como o [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/#usage)[^29], para identificar cada controle do formulário.

* **Agrupamento de controles:** use os \<fieldset\>elementos \`\<legend\>\<span\>\` e \`\<span\>\` para agrupar e associar controles de formulário relacionados. 

* **Instruções:** forneça instruções para ajudar os usuários a entender como preencher o formulário e os controles individuais do formulário. 

* **Validação:** valide os dados fornecidos pelo usuário e ofereça opções para desfazer alterações e confirmar a entrada de dados. 

* **Notificações:** notifique os usuários sobre a conclusão bem-sucedida de tarefas, quaisquer erros e forneça instruções para ajudá-los a corrigir os erros. 

* **Formulários longos:** divida formulários longos em vários formulários menores que constituem uma série de etapas ou fases lógicas e informem os usuários sobre seu progresso. 

* **Controles personalizados:** utilize elementos de formulário estilizados e outras técnicas de aprimoramento progressivo para fornecer controles personalizados.

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 11]**  
> **Título:** Anatomia de um Campo de Formulário Acessível  
> **Descrição da Arte:** Diagrama anotado de um campo de entrada (input): rótulo visível <label> permanentemente associado pelo atributo 'for', texto de ajuda instrutivo, marcação de campo obrigatório e mensagem de validação de erro contextual com sugestão de correção.  
> **Elementos Visuais:** Mockup explodido de input com setas numeradas apontando para cada requisito de acessibilidade.  
> **Paleta Sugerida:** Design de formulário moderno, limpo, alinhado ao padrão Governo Digital.  
> **Diretriz de Acessibilidade:** Evitar uso exclusivo de placeholder como único rótulo.
 

11. [**Listas:**](https://www.w3.org/WAI/tutorials/page-structure/content/#lists)

	Existem vários tipos de lista:

* **Listas não ordenadas:** usadas quando a ordem dos itens não é relevante.  
  * A lista não ordenada consiste em um \<ul\>elemento e múltiplos itens de lista ( \<li\>):   
* **Listas ordenadas:** são usadas para informações sequenciais e enumeradas automaticamente pelo navegador.  
  * A lista ordenada consiste em um \<ol\>elemento e vários itens de lista ( \<li\>)  
* **Listas de descrição:** são grupos de termos e descrições conectados programaticamente.  
  * Uma lista de descrição consiste em um ou mais agrupamentos de termos e descrições. Cada agrupamento associa um ou mais termos (o conteúdo dos \<dt\>elementos) a uma ou mais descrições (o conteúdo dos \<dd\>elementos).   
  * Um agrupamento começa no primeiro item da lista ou sempre que um \<dt\>elemento segue outro \<dd\>elemento. 

  **IMPORTANTE:** “Cada leitor de tela exibe \<dl\>o conteúdo de forma diferente, incluindo a contagem total, o contexto de termos/definições e os métodos de navegação. Essas diferenças não são necessariamente bugs. A partir do iOS 14, o VoiceOver anunciará que \<dl\>o conteúdo é uma lista ao navegar com o cursor virtual (não pelo comando "ler tudo"). O VoiceOver não oferece suporte a comandos de navegação em listas com \`\<li\>\` \<dl\>. Tenha cuidado ao aplicar ARIA terme definition funções a \<dl\>construções, pois o VoiceOver (macOS e iOS) ajustará a forma como elas são anunciadas.”[^30] 

  Os itens individuais de uma lista podem conter uma variedade de elementos HTML, incluindo parágrafos, títulos, elementos de formulário e outras listas (aninhadas).

### 

### Apresentação do conteúdo imagético: 

Orientações gerais:

Imagens e gráficos tornam o conteúdo mais agradável e, até mesmo, mais fácil de entender, principalmente para aquelas com baixo letramento ou dificuldades cognitivas.  No entanto, é imprescindível que elas venham acompanhadas de acessibilidade, para que não se tornem barreiras para outros grupos, como pessoas com deficiência visual. 

1. [**Imagens informativas:**](https://webparatodos.com.br/blog/texto-alternativo-imagens-guia-completo)

   Imagens que representam graficamente conceitos e informações, geralmente figuras, fotos e ilustrações. 

* Para que um leitor de tela consiga transmitir a informação da imagem, ela precisa estar descrita no “alt”.

* Não há limite oficial, mas 100–150 caracteres são suficientes para a maioria dos casos. 

* Caso haja necessidade de mais, considere um longdesc ou descrição expandida no texto da página.

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 12]**  
> **Título:** O Atributo 'alt' no Leitor de Tela — Imagens Informativas  
> **Descrição da Arte:** Ilustração do funcionamento da tecnologia assistiva: uma imagem de um atendimento ao público da Prefeitura do Rio sendo interpretada por um leitor de tela (NVDA/TalkBack), que sintetiza a fala com base no atributo alt descritivo.  
> **Elementos Visuais:** Foto/desenho com balão de fala sonoro contendo a descrição textual acessível.  
> **Paleta Sugerida:** Cores quentes e acolhedoras para o atendimento humano, tons de azul para o sintetizador.  
> **Diretriz de Acessibilidade:** Ressaltar a concisão (100 a 150 caracteres) e a riqueza contextual da descrição.

* Exemplo de descrição de imagem:

**Incorreta:**
```html
<img src="equipe.jpg" alt="Foto da equipe">
```

**Correta:**
```html
<img src="equipe.jpg" alt="Equipe de desenvolvimento do Web para Todos: cinco pessoas em frente a um quadro branco com diagramas de fluxo">
```

2. [**Imagens decorativas:**](https://www.w3.org/WAI/tutorials/images/decorative/)

   É aquela que tem como único objetivo adicionar decoração visual à página, em vez de transmitir informações.

* O ideal é que os leitores de tela ignorem esse tipo de imagem, porque ele não contém nenhum conteúdo.

* Deve-se deixar o conteúdo do atributo "alt" vazio (alt=””), para que a imagem seja ignorada pelos leitores de tela.

3. [**Imagens funcionais:**](https://www.w3.org/WAI/tutorials/images/functional/)

* O texto que acompanha uma imagem usada como link ou botão deve descrever a funcionalidade do link ou botão, não a imagem em si.

* Ex.: imagem com ícone de impressora deve representar a função de impressão.

4. [**Imagens com texto:**](https://www.gov.br/gestaodeconteudo/pt-br/manuais-e-tutoriais/acessibilidade-em-imagens/acessibilidade-em-imagens-no-plone)

* Não é recomendado que uma imagem contenha um texto dentro dela, porque leitores de tela não conseguem interpretar textos que estão em formato de imagem. 

* Caso isso ocorra, ele deve ser descrito na íntegra para que seja possível ser captado pelo leitor de tela.

* Não coloque muito texto em suas imagens. O ideal é que a imagem complemente a informação. 

* É essencial utilizar texto em HTML e CSS para evitar distorções ao redimensionar as telas.

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 13]**  
> **Título:** Texto Real em HTML/CSS vs. Texto Embutido em Imagem Rasterizada  
> **Descrição da Arte:** Comparativo ilustrado: Banner promocional com texto 'achatado' dentro do arquivo de imagem (perda de qualidade ao ampliar, invisível para leitores de tela) versus Banner com imagem de fundo estilizada e texto real renderizado via HTML e CSS.  
> **Elementos Visuais:** Simulação de zoom 200%: lado esquerdo borrado/pixelado; lado direito 100% nítido, selecionável e responsivo.  
> **Paleta Sugerida:** Contraste forte entre a imagem e as caixas de texto.  
> **Diretriz de Acessibilidade:** Destacar a preservação de nitidez em telas de alta densidade (Retina/OLED).

5. [**Imagens complexas:**](https://www.w3.org/WAI/tutorials/images/complex/)

* No caso de gráficos e imagens complexas, precisamos fornecer uma descrição mais detalhada. 

* A solução é fornecer as informações do gráfico no próprio contexto antes ou depois da imagem ou então em um link logo após a imagem.

6. [**Grupos de imagens:**](https://www.w3.org/WAI/tutorials/images/groups/)

* Se várias imagens transmitem uma única informação, o texto alternativo para uma imagem deve transmitir a informação para todo o grupo. 

7. [**Mapas de imagem:**](https://www.w3.org/WAI/tutorials/images/imagemap/)

   Um mapa de imagem é uma imagem dividida em áreas selecionáveis. Cada área é um link para outra página ou para outra parte da mesma página.

* O texto alternativo para uma imagem que contém várias áreas clicáveis ​​deve fornecer um contexto geral para o conjunto de links.

* Cada área clicável individualmente deve ter um texto alternativo que descreva a finalidade ou o destino do link. 

8. [**Tabelas:**](https://www.w3.org/WAI/tutorials/tables/)

* Tabelas acessíveis precisam de marcação HTML que indique as células de cabeçalho e as células de dados, definindo sua relação. Tecnologias assistivas usam essas informações para fornecer contexto aos usuários.

* As células de cabeçalho devem ser marcadas com \<th\>\`\\href\`

* As células de dados com \`\\dref\` \<td\>

* Para tabelas mais complexas, associações explícitas podem ser necessárias usando atributos como scope\` id\\href\`, \`\\dref\` e \`\\dref\` headers.

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 14]**  
> **Título:** Estrutura Semântica de Tabelas de Dados  
> **Descrição da Arte:** Diagrama de uma tabela acessível evidenciando a marcação de <caption> (título resumido da tabela), cabeçalhos de coluna <th> com scope='col', cabeçalhos de linha com scope='row' e células de dados <td>.  
> **Elementos Visuais:** Tabela tridimensional ou explodida com linhas de conexão demonstrando como o leitor de tela relaciona cada célula ao seu cabeçalho correspondente.  
> **Paleta Sugerida:** Cabeçalhos em azul escuro (#002B49) e linhas zebradas suaves.  
> **Diretriz de Acessibilidade:** Mostrar a lógica de leitura horizontal e vertical para leitores de tela.

Apresentação do conteúdo em vídeo:

#### Orientações gerais:

Além do conteúdo textual, deve ser fornecida uma alternativa em mídia aos que se beneficiam de representações alternativas a texto, que podem ser **áudio**, **vídeo** (incluindo vídeo em língua de sinais) ou **áudio e vídeo juntos**. 

1. [**Uso de legendas**:](https://www.w3.org/WAI/media/av/captions/) 

* Legenda pré-gravada: devem ser fornecidas legendas para todo conteúdo de áudio pré-gravado em mídia sincronizada.

* Legendas geradas automaticamente não costumam atender às necessidades do usuário, nem aos requisitos de acessibilidade. Geralmente, elas precisam de edições significativas. 

* O formato mais comum para legendas na web é [o](https://www.w3.org/TR/webvtt/) The Web Video Text Tracks Format (WebVTT). 

* Caso não seja possível, deve ser oferecida uma alternativa em texto, contendo as mesmas informações do áudio pré-gravado. 

  * Esta alternativa pode estar disponível em arquivo para download ou link.

  * Identifique os oradores, indique sons não verbais, inclua informações importantes sobre o discurso. 

* Legenda ao vivo: devem ser fornecidas legendas para todo conteúdo de áudio ao vivo em mídia sincronizada.

2. [**Uso de audiodescrição**](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#audio-description-or-media-alternative-prerecorded)

* Audiodescrição: deve ser fornecida [audiodescrição](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#dfn-audio-descriptions) para todo o conteúdo de [vídeo](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#dfn-video) [pré-gravado](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#dfn-prerecorded) em [mídia sincronizada](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#dfn-synchronized-media). 

* Audiodescrição estendida: quando as pausas no áudio de primeiro plano forem insuficientes para permitir que as audiodescrições transmitam o sentido do vídeo, é fornecida uma audiodescrição estendida para todo o [vídeo](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#dfn-video) [pré-gravado](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#dfn-prerecorded) no conteúdo em [mídia sincronizada](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#dfn-synchronized-media). 

3.  [**Mídia alternativa:**](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#audio-description-or-media-alternative-prerecorded)

* Deve ser oferecida uma alternativa para mídia com base em tempo para todo o conteúdo em mídia sincronizada [pré-gravada](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#dfn-prerecorded) e em mídia de [apenas vídeo](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#dfn-video-only) pré-gravado. 

* Como *alternativa para mídia com base em tempo,* entende-se: documento que inclui descrições em texto, corretamente sequenciadas, de informações visuais e auditivas baseadas em tempo.

* Além das informações contidas nas falas, é preciso informar todo o conteúdo visual relevante para a compreensão do vídeo, como expressões corporais, risadas, informações em texto, mudança de ambiente, etc.

4. [**Língua de sinais:**](https://www.w3.org/WAI/media/av/sign-languages/)

* Deve ser oferecida alternativa em língua de sinais para todo conteúdo de áudio pré-gravado em mídia sincronizada.

* O plugin de LIBRAS não substitui a tradução humana.

* A LIBRAS não está somente ligada à língua falada do país, mas também possui regionalidades, portanto é preferível um tradutor que acompanhe essas regionalidades.

* Geralmente, é melhor que o fundo e as roupas de quem está traduzindo sejam de cores sólidas que contrastem com o tom de pele. Além disso, é necessário gravar o intérprete com uma boa iluminação, a fim de garantir uma boa visibilidade.

* Na hora da gravação, certifique-se que a imagem captura a linha abaixo da cintura até acima da cabeça, bem laterais até cada um dos cotovelos.

* Os espectadores precisam conseguir ver claramente todos os movimentos e expressões faciais.

* Posicione o intérprete de língua de sinais de forma a evitar que informações importantes no vídeo sejam obscurecidas. Geralmente, ele fica no canto inferior direito, mas se o vídeo contiver informações na parte inferior, posicione o intérprete acima dele.

### 

### Estrutura da página

Orientações gerais:

Uma página web bem estruturada facilita o acesso e a navegação para todos, especialmente para pessoas com deficiências cognitivas, visuais ou que utilizam leitores de tela, teclado e outros recursos de acessibilidade. Uma estrutura clara também melhora a navegação em dispositivos móveis, permite acessar diretamente diferentes seções da página e ajuda os mecanismos de busca a compreender e indexar melhor o conteúdo. 

1. [**Cabeçalhos:**](https://www.w3.org/WAI/tutorials/page-structure/regions/#page-header)

   A maioria dos sites possui uma área no topo de cada página que contém informações gerais do site, como o logotipo, a função de busca e as opções de navegação. 

* A interface deve seguir a estrutura hierárquica correta. 

* Os cabeçalhos (títulos) em HTML são representados pelas tags \<h1\> até \<h6\>, informando ao navegador que trata-se de um cabeçalho ("h" vem do inglês "heading", que significa cabeçalho). 

* O "h1" deve ser o título principal da página, ou seja, deverá existir apenas um elemento "h1" em cada página. 

* Em seguida, devem ser utilizados os níveis subsequentes de título, de maneira hierárquica, sem se pular um ou mais níveis.

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 15]**  
> **Título:** Árvore de Hierarquia Semântica de Cabeçalhos (H1 a H4)  
> **Descrição da Arte:** Diagrama em árvore mostrando a correta ordenação dos títulos em um portal: H1 (único, tema principal) -> H2 (capítulos/seções) -> H3 (subtópicos) -> H4 (detalhes). Alerta visual contra a prática incorreta de pular níveis (ex: H1 direto para H3).  
> **Elementos Visuais:** Organograma hierárquico com nós conectados e ícones de marcação semântica.  
> **Paleta Sugerida:** Gradiente estruturado de azuis da Prefeitura do Rio, do mais escuro (H1) ao mais claro (H4).  
> **Diretriz de Acessibilidade:** Excelente guia rápido de arquitetura da informação para criadores de conteúdo.

2. [**Rodapé:**](https://www.w3.org/WAI/tutorials/page-structure/regions/#page-footer)

   Assim como o cabeçalho da página, a maioria dos sites também possui uma região na parte inferior de cada página que contém informações gerais do site, como informações sobre direitos autorais, declarações de privacidade ou isenções de responsabilidade. 

* O HTML5 fornece o \<footer\>elemento \`\<body\>\`, que pode ser usado para definir essa região. 

* Se o \<footer\>elemento for usado dentro \<article\>de \<section\>outros elementos, ele não será associado a esses elementos. Ele não receberá a contentinfo função WAI-ARIA e não terá comportamento especial em tecnologias assistivas. 

3. [**Conteúdo principal:**](https://www.w3.org/WAI/tutorials/page-structure/regions/#main-content)

* Utilize o \<main\>elemento HTML5 para identificar a região de conteúdo principal de uma página web ou aplicação. 

4. [**Conteúdo complementar:**](https://www.w3.org/WAI/tutorials/page-structure/regions/#complementary-content)

* Utilize o \<aside\> elemento HTML5 para identificar regiões que complementam o conteúdo principal, mas que constituem seções separadas e significativas por si só.

* Ex.: uma nota lateral explicando ou comentando o conteúdo principal.

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 16]**  
> **Título:** Regiões Semânticas e Pontos de Referência (Landmarks HTML5)  
> **Descrição da Arte:** Wireframe de uma página web destacando as principais regiões semânticas: <header> (topo/banner), <nav> (navegação/menus), <main> (conteúdo principal único), <aside> (complementar/lateral) e <footer> (rodapé institucional).  
> **Elementos Visuais:** Esquema visual de página web com blocos codificados por cor e etiquetas de código semântico.  
> **Paleta Sugerida:** Paleta de layout suave com contornos pontilhados em azul e ciano.  
> **Diretriz de Acessibilidade:** Facilita o entendimento de como pessoas cegas saltam rapidamente entre seções da página.
 

5. ### [**Menu:**](https://www.w3.org/WAI/tutorials/menus/)

* Dê preferência a estruturas de menu em lista. Essas informações estruturais permitem que as tecnologias assistivas anunciem o número de itens no menu e forneçam a funcionalidade de navegação correspondente. 

* Identifique o menu, idealmente usando o \<nav\>elemento HTML5 para permitir que os usuários acessem o menu diretamente. 

* Utilize formatação para indicar o item atual de um menu, como a página atual em um site, para melhorar a orientação no menu.

* A estrutura do menu deve ser consistente em todos os tamanhos de tela. Alguns itens do menu podem estar recolhidos ou até mesmo ocultos em submenus de navegação, mas os itens que forem exibidos devem aparecer na mesma ordem, com a mesma descrição e destino. 

6. [**Carrossel:**](https://www.w3.org/WAI/tutorials/carousels/)

   Os carrosséis são frequentemente usados ​​como galerias para exibir uma série de imagens. No entanto, conteúdos mais complexos, como teasers, artigos ou seções inteiras de páginas da web, também podem ser exibidos em carrosséis. 

* Em todos os casos, utilize a marcação apropriada para garantir que a estrutura e o significado do conteúdo sejam transmitidos com clareza. 

* Como uma coleção de itens de conteúdo, os carrosséis são geralmente melhor representados como listas não ordenadas, usando \`\<ul\>\` \<ul\>e \`\<span\>\` \<li\>. Dependendo do contexto, outros elementos também podem ser usados, como marcação de títulos, seções, listas, artigos e outros elementos, conforme necessário. 

### Navegabilidade da interface

Orientações gerais:

1. [**Navegação por teclado**](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#keyboard-accessible)

* Toda a funcionalidade do conteúdo deve ser operável através teclado sem exigir o pressionamento de teclas individuais em tempos específicos, exceto quando a função subjacente requer entrada de dados que dependa do caminho do movimento do usuário e não apenas dos pontos finais. 

* Um usuário que navega somente pelo teclado deve conseguir entrar e sair de qualquer componente ou funcionalidade usando o teclado, sem ficar permanentemente preso em algum elemento.

* Para que a navegação por teclado funcione da melhor forma possível, seja para pessoas com deficiência física ou visual (com uso de leitor de tela), é de suma importância que se respeite a hierarquia do conteúdo e se faça as indicações corretas de tag no código HTML.

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 17]**  
> **Título:** Indicador de Foco Visível para Navegação por Teclado  
> **Descrição da Arte:** Demonstração de acessibilidade motora e visual: elemento interativo (botão ou link) recebendo foco pelo teclado (tecla Tab) com anel de destaque (:focus-visible) duplo e de alto contraste. Comparação com o erro comum de remover o contorno com 'outline: none'.  
> **Elementos Visuais:** Simulação de botão em 3 estados: Normal, Hover (mouse) e Foco Ativo pelo Teclado com anel iluminado de 3px.  
> **Paleta Sugerida:** Botão em azul royal com anel de foco em ciano vívido (#00C0F3) e offset branco.  
> **Diretriz de Acessibilidade:** Requisito indispensável para usuários que utilizam teclado, switches ou comando de voz.

2. [**Tempo de navegação ajustável:**](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#timing-adjustable)

* Em caso de navegação com limite de tempo, deve-se oferecer uma das opções:

  * Desligar: o usuário pode desligar o limite de tempo antes de atingi-lo;

  * Ajustar: o usuário pode ajustar o limite de tempo antes de atingi-lo em um amplo intervalo (de, pelo menos, dez vezes maior que a duração da configuração padrão); ou

  * Prolongar: o usuário é avisado antes de o tempo expirar e tem, no mínimo, 20 segundos para prolongar o limite de tempo com uma simples ação.

    

* As exceções ao ajuste de tempo são:

  * O limite de tempo é uma parte necessária de um evento em tempo real (por exemplo, um leilão), e não é possível nenhuma alternativa ao limite de tempo; 

  * O limite de tempo é essencial e prolongá-lo invalidaria a atividade; 

  * O limite de tempo é superior a 20 horas. 

3. [**Controlar movimento de informações ou animações:**](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/#pause-stop-hide)

* Para qualquer informação que se mova, pisque ou role e que sejam iniciadas automaticamente, durem mais de cinco segundos e sejam apresentadas em paralelo com outro conteúdo, deve haver um mecanismo que permita ao usuário **pausar ou ocultar**, a menos que o movimento, o piscar ou a rolagem façam parte de uma atividade em que isso seja essencial.

* O mesmo se aplica para qualquer animação, a menos que seja essencial para a funcionalidade ou para as informações que estão sendo transmitidas. 

### Outras dicas de design

1. [**Navegação clara e consistente:**](https://www.w3.org/WAI/tips/designing/#provide-clear-and-consistent-navigation-options)

* Garanta que a navegação entre as páginas de um site tenha nomes, estilos e posicionamento consistentes. 

* Ofereça mais de um método de navegação, como uma busca no site ou um mapa do site. 

* Ajude os usuários a entenderem onde estão no site ou na página, fornecendo dicas de orientação, como trilhas de navegação (breadcrumbs) e títulos claros. 

2. [**Feedback facilmente identificável:**](https://www.w3.org/WAI/tips/designing/#provide-easily-identifiable-feedback)

* Forneça feedback para interações, como confirmar o envio de um formulário, alertar o usuário quando algo der errado ou notificá-lo sobre alterações na página. 

* As instruções devem ser fáceis de identificar. 

* Feedbacks importantes que exigem ação do usuário devem ser apresentados de forma destacada. 

3. [**Design para diferentes tamanhos de viewport:**](https://www.w3.org/WAI/tips/designing/#create-designs-for-different-viewport-sizes)

* Considere como as informações da página são apresentadas em telas de diferentes tamanhos, como celulares ou janelas de navegador com zoom. 

* A posição e a apresentação dos elementos principais, como cabeçalho e navegação, podem ser alteradas para melhor aproveitamento do espaço. 

* Certifique-se de que o tamanho do texto e a largura da linha estejam configurados para maximizar a legibilidade. 

* O design deve ser responsivo para atender às diretrizes de redimensionamento (200% de zoom), garantindo que elementos como botões, campos de formulário e textos ampliados não fiquem sobrepostos ou cortados.

> **[ESPAÇO PARA ILUSTRAÇÃO • ARTE 18]**  
> **Título:** Reflow Responsivo — Adaptação Fluida a 320px sem Rolagem Horizontal  
> **Descrição da Arte:** Ilustração do critério WCAG 1.4.10 (Reflow): o mesmo portal exibido em tela de Desktop (1280px) com múltiplas colunas e adaptado fluidamente para tela mobile estreita (320px de largura) ou zoom de 400%, sem perda de conteúdo e sem necessidade de barra de rolagem horizontal.  
> **Elementos Visuais:** Dois dispositivos lado a lado (Monitor vs Smartphone compacto) mostrando o rearranjo vertical natural dos blocos de conteúdo.  
> **Paleta Sugerida:** Fundos claros com blocos de texto e botões redimensionados com área de toque mínima de 44x44px.  
> **Diretriz de Acessibilidade:** Destacar a importância do design mobile-first e da tipografia responsiva com unidades relativas.
 

[^1]:  **BRASIL. Ministério da Saúde.** Saúde da pessoa com deficiência. Brasília, DF: Ministério da Saúde, \[sem data\]. Disponível em: \<\<[https\://www\.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-pessoa-com-deficiencia](https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-pessoa-com-deficiencia?utm_source=chatgpt.com)\>\>. Acesso em: 

[^2]:  **SETA, Renata.** Deficiências invisíveis, deficiências ocultas, neurodivergências e doenças raras: fundamental falar sobre isso\! *Faculdade de Educação – UNICAMP*, 10 jul. 2024\. Disponível em: [\<\<https\://portal.fe.unicamp.br/artigo/deficiencias-invisiveis-deficiencias-ocultas-neurodivergencias-e-doencas-raras-fundamental-falar-sobre-isso/](https://portal.fe.unicamp.br/artigo/deficiencias-invisiveis-deficiencias-ocultas-neurodivergencias-e-doencas-raras-fundamental-falar-sobre-isso/?utm_source=chatgpt.com)\>\>. Acesso em: 

[^3]:  BRASIL. *Cartilha do Censo 2010: pessoas com deficiência*. Brasília, DF: Secretaria de Direitos Humanos da Presidência da República; Secretaria Nacional de Promoção dos Direitos da Pessoa com Deficiência, 2012\. Disponível em: [\<\<https\://siac.fpabramo.org.br/uploads/acaoinstitucional/SNPDPCD\_censo\_2012.pdf](https://siac.fpabramo.org.br/uploads/acaoinstitucional/SNPDPCD_censo_2012.pdf?utm_source=chatgpt.com)\>\>. Acesso em: 

[^4]:  RIO DE JANEIRO (Município). Instituto Pereira Passos. *Cadernos do Rio: pessoas com deficiência*. Rio de Janeiro: Instituto Pereira Passos, jun. 2013, p. 9\. Disponível em: [\<\<https\://www\.data.rio/documents/0507e899644f469185454462c776862b/explore](https://www.data.rio/documents/0507e899644f469185454462c776862b/explore?utm_source=chatgpt.com)\>\>. Acesso em: 

[^5]:  FERRAZ, Carolina Valença. O desaparecimento das pessoas com deficiência; ou a balada do capacitismo estrutural. *Folha de S.Paulo*, São Paulo, 25 jul. 2025\. Opinião. Disponível em: [\<\<https\://www1.folha.uol.com.br/opiniao/2025/07/o-desaparecimento-das-pessoas-com-deficiencia-ou-a-balada-do-capacitismo-estrutural.shtml](https://www1.folha.uol.com.br/opiniao/2025/07/o-desaparecimento-das-pessoas-com-deficiencia-ou-a-balada-do-capacitismo-estrutural.shtml?utm_source=chatgpt.com)\>\>. Acesso em: 

[^6]:  IBGE, **Diretoria de Pesquisas, Coordenação de Pesquisas por Amostra de Domicílios, Pesquisa Nacional por Amostra de Domicílios Contínua 2022\.** Disponível em: \<\<[https\://biblioteca.ibge.gov.br/visualizacao/livros/liv102013\_informativo.pdf](https://biblioteca.ibge.gov.br/visualizacao/livros/liv102013_informativo.pdf)\>\>. Acesso em: 

[^7]:  **STEIL, Juliana.** “As 20 cidades com mais idosos no Brasil, segundo Censo 2022”. *Valor Econômico*, São Paulo, 5 fev. 2025\. Disponível em: \<\<[https\://valor.globo.com/brasil/artigo/as-20-cidades-com-mais-idosos-no-brasil-segundo-censo-2022.ghtml](https://valor.globo.com/brasil/artigo/as-20-cidades-com-mais-idosos-no-brasil-segundo-censo-2022.ghtml)\>\> Acesso em: 

[^8]:  TELES, Lilia; COSTA, André Coelho. População do RJ tem queda em quatro anos, segundo IBGE. *G1*, Rio de Janeiro, 22 ago. 2024\. Disponível em: \<\<[https\://g1.globo.com/rj/rio-de-janeiro/noticia/2024/08/22/populacao-do-rj-queda-em-quatro-anos-ibge.ghtml](https://g1.globo.com/rj/rio-de-janeiro/noticia/2024/08/22/populacao-do-rj-queda-em-quatro-anos-ibge.ghtml)\>\>. Acesso em: 

[^9]:  BRASIL. *Convenção sobre os Direitos das Pessoas com Deficiência/ Lei Brasileira de Inclusão da Pessoa com Deficiência*. Ministério da Justiça e Cidadania. Secretaria Especial dos Direitos da Pessoa com Deficiência. 2016, p.9. Disponível em: \<\<[https\://www\.mds.gov.br/webarquivos/Oficina%20PCF/JUSTI%C3%87A%20E%20CIDADANIA/convencao-e-lbi-pdf.pdf](https://www.mds.gov.br/webarquivos/Oficina%20PCF/JUSTI%C3%87A%20E%20CIDADANIA/convencao-e-lbi-pdf.pdf)\>\>. Acesso em: 

[^10]:  BRASIL. *Lei nº 13.146, de 6 de julho de 2015\. Institui a Lei Brasileira de Inclusão da Pessoa com Deficiência (Estatuto da Pessoa com Deficiência)*. Brasília, DF: Presidência da República, 2015\. Disponível em:  \<\<[https\://www\.planalto.gov.br/ccivil\_03/\_ato2015-2018/2015/lei/l13146.htm](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm)\>\>. Acesso em:								

[^11]:  BRASIL. Lei nº 13.146/ 2015, art. 3º, I.

[^12]:  Para saber mais sobre o assunto, consulte o Guia de Bolso 7 Dimensões da Acessibilidade. Disponível em: \<\<[https\://smpd.prefeitura.rio/wp-content/uploads/sites/33/2025/11/Guia-de-Bolso-7-dimensoes-PDF.pdf](https://smpd.prefeitura.rio/wp-content/uploads/sites/33/2025/11/Guia-de-Bolso-7-dimensoes-PDF.pdf)\>\>  Acesso em:

[^13]:  Como desenhos universais entende-se a concepção de produtos, ambientes, programas e serviços a serem usados por todas as pessoas, sem necessidade de adaptação ou de projeto específico, incluindo os recursos de tecnologia assistiva. BRASIL. Lei nº 13.146/ 2015, art. 3º, II.

[^14]:  PREFEITURA DO RIO DE JANEIRO. *Sete Dimensões da Acessibilidade*. Secretaria Municipal da Pessoa com Deficiência, Rio de Janeiro, s/d, p. 

[^15]:  BRASIL. Lei nº 13.146/ 2015, art. 63\.

[^16]:  BIGDATACORP. *Acessibilidade nos sites brasileiros 2024*. Disponível em: [\<\<https\://blog.bigdatacorp.com.br/acessibilidade-nos-sites-brasileiros-2024/](https://blog.bigdatacorp.com.br/acessibilidade-nos-sites-brasileiros-2024/?utm_source=chatgpt.com)\>\>. Acesso em: 

[^17]:  MOVIMENTO WEB PARA TODOS (WPT). Metodologia utilizada no estudo de acessibilidade em sites ativos (Brasil, 2024). WPT, 3 jul. 2024\. Disponível em: [\<\<https\://mwpt.com.br/metodologia-utilizada-no-estudo-de-acessibilidade-em-sites-ativos-brasil-2024/](https://mwpt.com.br/metodologia-utilizada-no-estudo-de-acessibilidade-em-sites-ativos-brasil-2024/?utm_source=chatgpt.com)\>\>. Acesso em: 

[^18]:  **BERGUES, Martina; LAFUENTE, Mariano.** *Uso de serviços digitais: um retrato do Brasil*. Washington, D.C.: Banco Interamericano de Desenvolvimento, 2025\. Disponível em: [\<\<https\://www\.gov.br/gestao/pt-br/assuntos/noticias/2025/abril/pesquisa-revela-que-77-dos-brasileiros-consideram-facil-o-acesso-a-servicos-publicos-digitais/usodeservicosdigitais\_bid.pdf](https://www.gov.br/gestao/pt-br/assuntos/noticias/2025/abril/pesquisa-revela-que-77-dos-brasileiros-consideram-facil-o-acesso-a-servicos-publicos-digitais/usodeservicosdigitais_bid.pdf?utm_source=chatgpt.com)\>\>. Acesso em: 

[^19]:  BERGUES & LAFUENTE. 2025, p. 24\.

[^20]:  BERGUES & LAFUENTE., 2025, p. 23\.

[^21]:  BERGUES & LAFUENTE., 2025, p. 9\.

[^22]:  BERGUES & LAFUENTE, 2025, p. 35\.

[^23]:  FERNANDA. Entendendo as diferenças entre design responsivo, adaptativo e mobile-first. *Medium*, 27 fev. 2018\. Disponível em: [https\://medium.com/@fnandaleite/entendendo-as-diferen%C3%A7as-entre-design-responsivo-adaptativo-e-mobile-first-ea3c61fc9181](https://medium.com/@fnandaleite/entendendo-as-diferen%C3%A7as-entre-design-responsivo-adaptativo-e-mobile-first-ea3c61fc9181). Acesso em: 

[^24]:  WORLD WIDE WEB CONSORTIUM (W3C). **Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.2**. W3C Recommendation, 5 out. 2023\. Disponível em: [\<\<https\://www\.w3c.br/traducoes/wcag/wcag22-pt-BR/](https://www.w3c.br/traducoes/wcag/wcag22-pt-BR/?utm_source=chatgpt.com). Acesso em: 

[^25]:  BRASIL. *Modelo de Acessibilidade em Governo Eletrônico (eMAG): versão 3.1*. Brasília, DF: Ministério do Planejamento, Orçamento e Gestão, 2014\. Disponível em: [\<\<https\://emag.governoeletronico.gov.br/](https://emag.governoeletronico.gov.br/?utm_source=chatgpt.com)\>\>. Acesso em: 

[^26]:  ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. *ABNT NBR 17060:2022: acessibilidade em aplicativos de dispositivos móveis — requisitos*. Rio de Janeiro: ABNT, 2022\. 

[^27]:  ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. *ABNT NBR 17225:2025: acessibilidade em conteúdo e aplicações web — requisitos*. Rio de Janeiro: ABNT, 2025\. 

[^28]:  **WORLD WIDE WEB CONSORTIUM (W3C).** *Introduction to Understanding WCAG 2.2*. W3C Web Accessibility Initiative, 15 jul. 2025\. Disponível em: [\<\<https\://www\.w3.org/WAI/WCAG22/Understanding/intro](https://www.w3.org/WAI/WCAG22/Understanding/intro?utm_source=chatgpt.com)\>\>. Acesso em: 

[^29]:  Para saber mais sobre as aplicações do WAI-ARIA, consulte: \<\<[https\://www\.w3.org/WAI/tutorials/forms/labels/](https://www.w3.org/WAI/tutorials/forms/labels/)\>\>.

[^30]:  Para saber mais, consulte a página do MDN sobre “Elemento de lista de descrição HTML”. Disponível em: \<\<[https\://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dl](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dl)\>\>. Acesso em:

