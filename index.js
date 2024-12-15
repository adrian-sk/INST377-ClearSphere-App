const express = require('express')
const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://xzfkabljpcolsmcukvnd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6ZmthYmxqcGNvbHNtY3Vrdm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMzg1NDYsImV4cCI6MjA0OTYxNDU0Nn0.J37zqU1KoC2xC1zZ0LiKK4N2_hNrvCG3MJhvvH4Lzkc'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/', (req, res) => {
    res.sendFile('public/LoginPage.html', { root: __dirname })
})

app.get('/users', async (req, res) => {
    console.log('Getting users')

    const { data, error } = await supabase
        .from('users')
        .select()

    if (error) {
        console.log('Error:', error)
        res.send(error)
    }
    else {
        console.log('Successfully retrieved data')
        res.send(data)
    }
})

app.post('/user', async (req, res) => {
    console.log("Adding user")
    console.log('Request', req.body)

    const firstName = req.body.firstName;
    const userName = req.body.userName;
    const password = req.body.password;

    const { data, error } = await supabase.from('users').insert({
        user_first_name: firstName,
        username: userName,
        user_password: password,
        past_searches: [],
        start_date: [],
        end_date: [],
    })
        .select()

    if (error) {
        console.log('Error:', error)
        res.send(error)
    }
    else {
        console.log('Successfully retrieved data')
        res.send(data)
    }
})

app.put('/update', async (req, res) => {
    console.log('Updating user')
    console.log('Request body', req.body)

    const id = req.body.id
    const location = req.body.location
    const start = req.body.start
    const end = req.body.end
    //const { id, location, start, end} = req.body;

    console.log('Locations Array', location);

   /* const { data, error } = await supabase
        .from('users')
        .update({ past_searches: ['simple_test'] })
        .eq('id', id)
        .select();
    */

    const { data, error } = await supabase
        .from('users')
        .update({ 
            past_searches: location, 
            start_date: start, 
            end_date: end,
        })
        .eq('id', id)
        .select()
    

    console.log('Supabase: ', { data, error });
    if (error) {
        console.log('Error:', error)
        res.send(error)
    }
    else {
        console.log('Successfully retrieved data')
        res.send(data)
    }
})

app.listen(port, () => {
    console.log("Yo")
})