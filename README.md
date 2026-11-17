# Acessa+

## Sobre
O Acessa+ é um protótipo de CitizenTech desenvolvido para auxiliar moradores a consultar, relatar e acompanhar barreiras de acessibilidade urbana. O projeto busca dar mais visibilidade a problemas que dificultam o deslocamento de pessoas com deficiência, idosos, pessoas com carrinho de bebê, gestantes e outros pedestres.

A proposta é criar um mapa colaborativo em que os próprios cidadãos possam informar barreiras encontradas no cotidiano, como calçadas irregulares, falta de rampas, obras, obstáculos e má iluminação. Assim, outras pessoas podem consultar essas informações antes de sair de casa e planejar deslocamentos mais seguros e acessíveis.

O Acessa+ está relacionado ao ODS 11: Cidades e Comunidades Sustentáveis, que busca tornar as cidades inclusivas, seguras, resilientes e sustentáveis. O projeto contribui para esse objetivo ao incentivar a participação da população na identificação de barreiras urbanas e ao dar mais visibilidade a problemas que afetam a mobilidade.

## Estrutura do projeto

acessa-mais-react/
|--public/
|  |----logo.png
|  |----favicon.png
|--src/
|  |---components/
|  |  |----MapView.jsx
|  |  |----Navbar.jsx 
|  |  |----Footer.jsx
|  |  |----FiltroBarreiras.jsx
|  |  |----RelatoCard.jsx
|  |---data/
|  |  |----locais.js
|  |  |----relatosIniciais.js
|  |---pages/
|  |  |----Home.jsx
|  |  |----Trajeto.jsx
|  |  |----Barreiras.jsx
|  |  |----Relatar.jsx
|  |  |----MeusRelatos.jsx
|  |  |----Sobre.jsx
|  |---services/
|  |  |----geocoding.js
|  |  |----relatos.js
|  |  |----routing.js
|  |---styles/
|  |  |----global.css
|  |---App.jsx
|  |---main.jsx
|--index.html
|--package.json
|--vite.config.js

## Framework e tecnologias utilizadas

O projeto foi desenvolvido com React, uma biblioteca JavaScript utilizada para criar interfaces de usuário baseadas em componentes. O React permite dividir a interface em partes reutilizáveis, como a barra de navegação, o mapa, os cards de relatos e os formulários.

O ambiente de desenvolvimento utilizado foi o Vite, uma ferramenta que facilita a criação e a execução de projetos front-end modernos. O Vite oferece um servidor de desenvolvimento rápido e permite visualizar as alterações no navegador durante o processo de programação.

A navegação entre as páginas foi implementada com o React Router. Essa biblioteca permite criar rotas para cada página do site e utilizar componentes como Link e NavLink para navegar entre elas sem recarregar a página inteira.

O estilo visual foi desenvolvido com CSS, utilizando classes personalizadas e o framework Bootstrap para facilitar a criação de layouts responsivos, botões, formulários, alertas, cards e sistemas de grid.

O mapa foi implementado com o componente MapView, que utiliza recursos de mapa interativo para exibir origem, destino, rota e barreiras. O projeto também utiliza serviços de geocoding e roteamento para transformar endereços em coordenadas e calcular trajetos.

## Páginas do site

O Acessa+ é composto por seis páginas principais:

### Página Home
A página inicial apresenta o Acessa+ e explica o propósito do projeto. Nela, o usuário entende que o site foi criado para ajudar no mapeamento colaborativo de barreiras de acessibilidade urbana.

Nessa página, o usuário encontra botões de acesso às principais funcionalidades: planejar um trajeto, consultar barreiras e relatar uma nova ocorrência.

### Página Planejar trajeto

A página Planejar trajeto permite que o usuário selecione um ponto de origem e um ponto de destino diretamente no mapa. Primeiro, o usuário clica no local de partida; depois, clica no destino desejado.

Após a seleção dos dois pontos, o sistema calcula uma rota entre eles e exibe a linha no mapa. Também são apresentadas informações como distância, tempo estimado e instruções do trajeto.


### Página Barreiras por região

A página Barreiras por região permite consultar relatos de barreiras de acessibilidade. O usuário pode filtrar as ocorrências por estado, cidade, bairro, tipo de barreira e gravidade.

### Página Relatar barreira

A página Relatar barreira permite que o usuário registre uma barreira encontrada na cidade. O formulário solicita informações como estado, cidade, bairro, endereço ou ponto de referência, tipo de barreira, gravidade e descrição.

### Página Meus relatos

A página Meus relatos reúne os relatos enviados pelo próprio usuário. Nela, é possível visualizar as barreiras registradas no dispositivo e acompanhar o status de cada ocorrência.

### Página Sobre

A página Sobre explica o problema abordado pelo Acessa+, a solução proposta e os benefícios para a comunidade. Ela também apresenta a relação do projeto com o ODS 11.

# Uso do JavaScript

O JavaScript é utilizado em diversas partes do Acessa+ para criar interações e atualizar a interface sem recarregar a página.

O React utiliza o JavaScript para controlar o estado da aplicação. Por exemplo, quando o usuário seleciona um filtro, digita uma busca ou clica no mapa, o estado é atualizado e a interface responde automaticamente.

