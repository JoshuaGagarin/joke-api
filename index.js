import express from "express"
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import axios from "axios"

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const port = 3000

app.use(bodyParser.urlencoded())
app.use(express.static(__dirname + '/public'))

var data = []
var params
var baseUrl = "https://v2.jokeapi.dev/joke/"

app.get('/', (req, res) => {
    res.render("index.ejs", {data: data})
    data = []
  })

app.post('/' , async (req, res) => {
    if (req.body.category) {
      params = req.body.category.toString()
      var url = baseUrl.concat(params)
    } else {
      params = "Any"
      var url = baseUrl.concat(params)
    }
    
    try {
        const response = await axios.get(url)
        console.log(url)
        if (response.data.joke) {
          data.push(response.data.joke)
        } else {
          data.push(response.data.setup)
          data.push(response.data.delivery)
        }
        res.redirect("/")
      } catch (error) {
        console.error(error);
      }
    
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })