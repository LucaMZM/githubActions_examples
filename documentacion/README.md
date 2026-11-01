# Pràctica de Jest i GitHub Actions - LucaMZM

La prova original `sum(1, 2) === 3` passa localment i en GitHub Actions. El workflow conserva el linter i executa Jest després, amb `needs: linter-execution`.

- [Repositori](https://github.com/LucaMZM/githubActions_examples)
- [Branca de la pràctica](https://github.com/LucaMZM/githubActions_examples/tree/nodejs_jest_job)
- [Memòria en PDF](../Practica_Jest_GitHubActions_LucaMZM.pdf)
- [Fitxer TXT per a Aules](../ENTREGA_Jest_LucaMZM.txt)
- [Execució amb les captures: 41320251093](https://github.com/LucaMZM/githubActions_examples/actions/runs/41320251093)
- [Totes les execucions de la branca, inclosa la publicació de la documentació](https://github.com/LucaMZM/githubActions_examples/actions?query=branch%3Anodejs_jest_job)

## Índex de les evidències

| Requisit | Captura autèntica | Registre o codi comprovable |
| --- | --- | --- |
| 1. Branca creada i publicada | [Branca en GitHub](evidencias/01-branca-github.png), [registre de Git](evidencias/01-branca-terminal-log.png) | [Reflog i upstream real](evidencias/01-branca-real.txt) |
| 2. Fitxers originals | [sum.js](evidencias/02-sum-original.png), [sum.test.js](evidencias/02-test-original.png) | [Funció](../sum.js), [test](../sum.test.js) |
| 3. Script de Jest | [package.json](evidencias/03-package-jest.png) | [Configuració](../package.json), [lockfile](../package-lock.json) |
| 4. Dos jobs | [Workflow complet](evidencias/04-workflow-needs.png) | [YAML](../.github/workflows/main_workflow.yml) |
| 5. Dependència needs | [Línia 26 del workflow](evidencias/04-workflow-needs.png) | `test-execution` necessita `linter-execution` |
| 6. Execució local | [Log local obert en navegador](evidencias/06-jest-local.png) | [npm test real](evidencias/06-jest-local.txt), [validacions locals](evidencias/05-validacio-local.txt) |
| 7. Commit i publicació | [Commit publicat](evidencias/07-commit-publicat.png), [registre local](evidencias/07-commit-log.png) | [Commit f38e05d](https://github.com/LucaMZM/githubActions_examples/commit/f38e05d6dd0a7514f2faba1a68fc026ef7ba149f) |
| 8. Dos jobs en verd | [Resum real de GitHub Actions](evidencias/08-actions-success.png) | [Metadades de GitHub](evidencias/08-execucio-verificada.json), [log complet](evidencias/08-github-actions.log) |
| 9. Instal·lació i test passat | [Job real en GitHub](evidencias/09-job-github.png), [extracte del log real obert en navegador](evidencias/09-log-real-navegador.png) | [Log original del job](evidencias/09-test-execution.log), [extracte llegible](evidencias/09-run-jest-extracte.txt) |

## Resultat i traçabilitat

Les captures de GitHub corresponen al commit `f38e05d6dd0a7514f2faba1a68fc026ef7ba149f` i a l'execució **41320251093**, activada per `push` sobre `nodejs_jest_job`, amb resultat **success**.

| Job | Inici UTC | Final UTC | Resultat |
| --- | --- | --- | --- |
| linter-execution | 2026-11-01 15:15:08 | 2026-11-01 15:16:50 | success |
| test-execution | 2026-11-01 15:16:52 | 2026-11-01 15:17:02 | success |

El segon job comença dos segons després d'acabar el primer. El log mostra `npm install jest`, `npm test`, `PASS ./sum.test.js`, `adds 1 + 2 to equal 3` i **1 test / 1 suite passats**.

## Autenticitat i limitacions de captura

Les imatges són captures de Chromium amb Playwright. No s'han generat pantalles ni resultats simulats. Les captures dels fitxers de text mostren registres reals oberts en el navegador; no són captures d'una terminal ni de la interfície de logs de GitHub.

GitHub exigeix iniciar sessió per a desplegar els logs en la web. Per això, el detall s'ha descarregat amb `gh run view --job 124889172651 --log`. L'extracte conserva els missatges del pas `Run jest tests`, sense les columnes de job, pas i marca temporal ni els codis de color; l'original íntegre també està publicat.

Si es necessita expressament la captura del log dins de GitHub, cal obrir [el job original](https://github.com/LucaMZM/githubActions_examples/actions/runs/41320251093/job/124889172651), iniciar sessió i desplegar **Run jest tests**. Per a una captura estrictament de terminal local, executar `npm test` en la carpeta del projecte i capturar-ne el resultat al Mac. Les evidències equivalents en navegador ja estan incloses.

## Decisions d'implementació

- La branca ja existia a l'inici de la sessió, basada en `3b72931` de `origin/nodejs_linter_job`; s'ha conservat. L'upstream anterior s'ha corregit amb `git push -u origin nodejs_jest_job`.
- `sum.js` i `sum.test.js` no s'han modificat. Els SHA-256 inicials i finals coincideixen: consten en [les validacions](evidencias/05-validacio-local.txt).
- Jest és una dependència de desenvolupament. `package-lock.json` està versionat i `node_modules/` està exclòs.
- ESLint manté les regles anteriors; només s'afig `env.jest: true` en `**/*.test.js`.
- Es mantenen `actions/checkout@v2` i `github/super-linter@v4`, tal com exigeix l'enunciat. Han funcionat sense modificar les versions. GitHub informa que executa checkout amb Node.js 24 i emet avisos de deprecació.
- npm informa d'avisos de dependències de desenvolupament (19 vulnerabilitats en el run documentat: 3 baixes i 16 moderades). No s'ha aplicat `npm audit fix --force`, perquè pot introduir canvis incompatibles. Els avisos no impedeixen el resultat correcte de Jest.

## Comprovacions i comandes

`git status -sb`, `git branch -vv`, `git remote -v`, `gh auth status`, `node --version`, `npm --version`, `npm install --save-dev jest`, `npm ci`, `npm test`, ESLint 8.57.1 sobre els tres fitxers JavaScript, comprovació del YAML i de `needs`, `git diff --check`, `git commit`, `git push -u origin nodejs_jest_job` i consulta de resultats amb `gh run view`.

Entorn local: Node.js 24.21.0 i npm 11.19.0. El linter anterior i la prova original passen. No s'ha fusionat amb `main` ni s'ha modificat l'historial de la branca anterior.
