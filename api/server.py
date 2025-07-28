from flask import Flask, jsonify, request

app = Flask(__name__)

# Rotas de exemplo (adicione suas rotas originais depois)
@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Vercel Serverless!"})

@app.route('/api/echo', methods=['POST'])
def echo():
    data = request.json
    return jsonify({"you_sent": data})

# Se você tinha rotas no backend original, copie e cole aqui dentro
# (substitua o conteúdo do antigo server.py, mas mantenha a estrutura do app acima)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
