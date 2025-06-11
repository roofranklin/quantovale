const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cors = require('cors');

puppeteer.use(StealthPlugin());

const app = express();
app.use(cors());
const PORT = 3001;

// Monta a URL com base nos parâmetros da query string
function buildZapUrl(params) {

  const path = params.path;

  const queryParams = new URLSearchParams({
    bas: params.banheiros || '',
    ros: params.quartos || '',
    gsp: params.vagas || '',
    ss: params.areaMinima || '',
    se: params.areaMaxima || '',
    ret: params.tipos || '',
  });

  return `https://www.olx.com.br/imoveis/venda/${path}?${queryParams.toString()}`;
}

app.get('/olx', async (req, res) => {
  const requiredParams = ['banheiros', 'quartos', 'vagas', 'areaMinima', 'areaMaxima', 'tipos'];
  const missingParams = requiredParams.filter(p => !req.query[p]);

  if (missingParams.length > 0) {
    return res.status(400).json({ error: `Faltam parâmetros obrigatórios: ${missingParams.join(', ')}` });
  }

  const targetUrl = buildZapUrl(req.query);
  console.log('🔗 URL de busca:', targetUrl);

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await page.goto(targetUrl, { waitUntil: 'networkidle2' });

    await page.waitForSelector('script#__NEXT_DATA__', { timeout: 15000 });

    const jsonData = await page.$eval('script#__NEXT_DATA__', el => JSON.parse(el.textContent));

    await browser.close();

    res.json(jsonData);
  } catch (error) {
    console.error('❌ Erro ao extrair dados:', error);
    res.status(500).json({ error: 'Erro ao acessar ou extrair dados da página.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API dinâmica rodando em http://localhost:${PORT}`);
});
