const http = require('http');

let todos = [{"name":"mania"}];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET' && req.url === '/todos') {
        res.writeHead(200);
        res.end(JSON.stringify(todos));

    } else if (req.method === 'POST' && req.url === '/todos') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); 
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                if (!data.todo) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Todo is required' }));
                } else {
                    todos.push(data.todo);
                    res.writeHead(201);
                    res.end(JSON.stringify({ message: 'Todo added successfully', todo: data.todo }));
                }
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });

    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
