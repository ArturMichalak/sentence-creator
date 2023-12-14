# SENTENCE CREATOR

Translate the sentence from `English` to `Polish`.

`LICENSE` MIT
`FRAMEWORK` NextJS 14 (ReactJS)

[Link to demo](https://sentence-creatorgg.vercel.app/)

## DEVELOPMENT

Check [documentation](https://nextjs.org/docs/getting-started/installation#run-the-development-server) to start server

### ENVIRONMENT VARIABLES (.env file)

[binubuo - generate sensence](https://rapidapi.com/codemonth/api/binubuo)

`SENTENCES_API_URL=https://<binubuo_rapidapi_url>/generator/text/sentence?locale=US`
`SENTENCES_API_KEY=<binubuo_rapidapi_key>`
`SENTENCES_API_HOST=binubuo.p.rapidapi.com`

[azure - generate voice](https://portal.azure.com/)

`VOICE_API_URL=https://<azure_region>.tts.speech.microsoft.com/cognitiveservices/v1`
`VOICE_API_REGION=<azure_region>`
`VOICE_API_KEY=<azure_key>`

[google translate - sentence to polish](https://rapidapi.com/googlecloud/api/google-translate1)

`TRANSLATE_API_URL=https://google-translate1.p.rapidapi.com/language/translate/v2`
`TRANSLATE_API_KEY=<google_translate_key>`
`TRANSLATE_API_HOST=google-translate1.p.rapidapi.com`

### CATALOGS

|catalog|description|
|-|-|
|app|The main catalog containing routes|
|components|universal components e.c. input used in many places|
|content|unique, specialized components|
|context|react context files|
|services (server-actions)|A server side functions executed on client components.|
|hooks|react hooks|
|constants|global constants|
|utils|universal helpers|

### COMMENTS

- don't use tailwind background image
- use css variables everywhere
- define the main color palette
- define standard fonts and spacing
