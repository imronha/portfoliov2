import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feedback: "", name: "", email: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }
    return (
      <section id="contact">
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Get In Touch.</span>
            </h1>
          </div>
          <div className="ten columns">
            <p className="lead">{message}</p>
          </div>
        </div>
        <div className="row">
          <div className="eight columns">
            <form
              className="test-mailing"
              action=""
              method="post"
              id="contactForm"
              name="contactForm"
            >
              <fieldset>
                <div>
                  <label htmlFor="contactName">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Please enter your name"
                    size="35"
                    id="contactName"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="contactEmail">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    placeholder="Please enter your email"
                    type="text"
                    value={this.state.email}
                    size="35"
                    id="contactEmail"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="contactMessage">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="test-mailing"
                    name="feedback"
                    onChange={this.handleChange}
                    placeholder="Please enter your message"
                    required
                    value={this.state.feedback}
                  />
                </div>
                <div>
                  <input
                    type="button"
                    value="Submit"
                    className="btn btn--submit submit"
                    onClick={this.handleSubmit}
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h4>Contact Information</h4>
              <p className="address">
                {name} Hajiahmad
                <br />
                {email}
                <br />
                {city}, {state} {zip}
                <br />
                <span>{phone}</span>
              </p>
            </div>

            <div className="widget widget_tweets">
              <h4 className="widget-title">Annoucements</h4>
              <ul id="twitter">
                <li>
                  <span>Made minor updates changes to UI/ resume info.</span>
                </li>
                <li>
                  <span>Updated contact form! It actually works now!</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value,
    });
  }

  handleSubmit(event) {
    const templateId = "template_ZtWmo47S";

    this.sendFeedback(templateId, {
      message_html: this.state.feedback,
      from_name: this.state.name,
      email: this.state.email,
    });
  }

  sendFeedback(templateId, variables) {
    window.emailjs
      .send("gmail", templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  }
}
