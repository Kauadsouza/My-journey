from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # libera CORS para chamadas do front

# CONFIGURE AQUI
EMAIL_REMETENTE = "contactnullforge@gmail.com"
SENHA_APP = "yktv adio kcds zrbz"
EMAIL_DESTINO = "contactnullforge@gmail.com"  # Pode ser o mesmo ou outro

@app.route("/enviar-email", methods=["POST"])
def enviar_email():
    data = request.json
    nome = data.get("name")
    email = data.get("email")
    mensagem = data.get("message")

    if not nome or not email or not mensagem:
        return jsonify({"status": "error", "message": "Por favor, preencha todos os campos."}), 400

    conteudo = f"Nome: {nome}\nEmail: {email}\n\nMensagem:\n{mensagem}"
    msg = MIMEText(conteudo)
    msg["Subject"] = "Nova mensagem do seu site"
    msg["From"] = EMAIL_REMETENTE
    msg["To"] = EMAIL_DESTINO

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_REMETENTE, SENHA_APP)
            server.send_message(msg)
        return jsonify({"status": "success", "message": "E-mail enviado com sucesso"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
