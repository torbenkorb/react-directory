import React, { Component } from 'react';

class Dialog extends Component {

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.querySelector('body').style.overflow = 'hidden';
      }

      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.querySelector('body').style.overflow = '';
      }

      /**
       * Set the wrapper ref
       */
      setWrapperRef = (node) => {
        this.wrapperRef = node;
      }

      handleClickOutside = (event) => {
          if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.close();
          }
        }

    render() {
        const { name, email, picture, location, phone, dob } = this.props.user;
        const date = new Date(dob.date);
        const dateoptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

        return (
          <div className="dialog">
            <div ref={this.setWrapperRef} className="dialog__panel">
              <div onClick={this.props.close} className="dialog__close">&times;</div>
                <div className="avatar">
                  <img src={picture.large} alt={name.first} />
                </div>
                <div className="info">
                    <div className="title">{name.first} {name.last}</div>
                    <div className="email"><i className="material-icons">mail</i> {email}</div>
                    <div className="city"><i className="material-icons">location_city</i> {location.city}</div>
                </div>

                <hr />

                <div className="additional-info">
                  <div><i className="material-icons">phone</i> {phone}</div>
                  <div><i className="material-icons">location_on</i> {location.street}, {location.postcode} {location.city}</div>
                  <div><i className="material-icons">calendar_today</i>{date.toLocaleDateString('de-DE', dateoptions)}</div>
                  <div>
                    <label>
                      <input type="checkbox" checked={this.props.user.confirmed} onChange={this.props.toggle.bind(this, this.props.user)} />
                      Confirmed
                    </label>
                  </div>
                </div>
            </div>
          </div>
        );
    }

}

export default Dialog;
