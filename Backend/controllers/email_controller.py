import os
import requests
from dotenv import load_dotenv
from flask import request, jsonify

class EmailController:
  @staticmethod
  def send_email():
    try:
        data = request.json
        from_email = data.get('from')
        to_email = data.get('to')
        subject = data.get('subject')
        html_content = data.get('html')

        response = requests.post(
            'https://api.resend.com/emails',
            json={
                "from": from_email,
                "to": to_email,
                "subject": subject,
                "html": html_content
            },
            headers={
                "Authorization": f"Bearer {os.getenv('RESEND_API_KEY')}",
                "Content-Type": "application/json"
            }
        )

        if response.status_code == 200:
            return jsonify(response.json()), 200
        else:
            return jsonify({"error": "Error al enviar el correo", "details": response.text}), response.status_code
    except Exception as e:
        return jsonify({"error": "Error interno del servidor", "details": str(e)}), 500