import traceback

from flask import Flask, render_template, request, make_response
from main import fetch_answer

app = Flask(__name__)

@app.route('/path', methods=['POST'])
def qa():
    """
    Handles the POST request for the Q&A endpoint.

    :returns: A JSON response containing the answer to the query
    :rtype: dict
    :description: This function extracts the query from the POST request, calls the fetch_answer function to get the answer,
                  and returns the answer in a JSON response with a 201 status code.
    """
    query = request.form.get("message")  # Get the query from the form data
    try:
        response = fetch_answer(query)  # Fetch the answer using the fetch_answer function
    except:
        print(traceback.format_exc())
        return make_response({"response": "Something went wrong while serving the request"}, 201)
    return make_response({"response": response}, 201)  # Return the response as JSON with a 201 status code

@app.route('/')
def gui():
    """
    Renders the GUI for the web application.

    :returns: The rendered HTML for the index page
    :rtype: str
    :description: This function renders and returns the index.html template to provide the web interface for the Q&A application.
    """
    return render_template('index.html')  # Render the index.html template

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8008)
    """
    Runs the Flask web application.

    :description: This block checks if the script is run directly and starts the Flask web server on host 0.0.0.0 and port 8008
                  with debug mode enabled.
    """
