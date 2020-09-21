/*
    -If a user has started typing an item and attempts to navigate away before submitting, let's warn them they'll lose their data if they proceed.
*/

import React from 'react';

export default class ItemInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    // This ensures that we don't see the 'Are you sure?' message on other views if our handleChange added the event listener and didn't meet a condition to remove it.
    window.removeEventListener('beforeunload', this.onUnload);
  }

  onUnload(e) {
    e.preventDefault();
    e.returnValue = '';
  }

  handleChange(e) {
    const { value } = e.target;
    const { item } = this.state;
    /*
            -To get our addEventListener to work properly without constantly calling addEventListener, we need to add some checks
                -It makes sense to do this in our handleChange
            -We also want to use removeEventListener if they delete everything in the input
                -This is because there's nothing worth worrying about anymore
        */
    if (value.trim() && !item) {
      /*
                -If they are typing an actual character into an empty input, let's add the event listener.
                -Look at your console to see which conditions are being met, for demo purposes.
                -The event listener persists until we either fire removeEventListener on it, or the component "dies" in the lifecycle (unmounts)
            */
      console.log('hit 1');
      window.addEventListener('beforeunload', this.onUnload);
    } else if (!value.trim() && item) {
      // If they are erasing everything in the input field, let's remove the event listener
      console.log('hit 2');
      window.removeEventListener('beforeunload', this.onUnload);
    } else if (!value.trim()) {
      // If they are just typing spaces into an empty input field, let's disregard their input and not setState
      console.log('hit 3');
      return;
    } else {
      // This console log is here just to see that no other conditions were met, for demo purposes.
      console.log('hit 4');
    }

    // If we didn't see 'hit 3' in our console, we will get this far and setState.
    this.setState({ item: value });
  }

  handleSubmit(e) {
    /*
            -Notice our submit is within a form. We'll need to prevent the default browser submission action so things don't reload.
            -We'll prevent users from submitting empty strings or only spaces.
            -We'll add the item to our previous items list and reset this.state.item to its initial value.
        */
    e.preventDefault();

    const { item } = this.state;
    const { addItem } = this.props;

    // Preventing the user from A) Submitting nothing, B) Submitting only spaces
    if (!item.trim()) return;

    /* 
            -If the user has spaces at the end of their item, let's get rid of those with trim and then invoke addItem with the item
                -Note: This also gets rid of extra spaces between words of an item
            -Note: We never allowed them to enter spaces at the beginning of their item
                -This was taken care of in the handleChange and we'd have seen 'hit 3' in the console
        */
    addItem(item.trim());

    /*
            -This part is optional and just clears the input.
            -This works because we set the value of the input (value attribute) to this.state.item
        */
    this.setState({ item: '' });
  }

  render() {
    const { item } = this.state;

    return (
      <form>
        <input
          type="text"
          onChange={this.handleChange}
          value={item}
          placeholder="add item and press enter"
        />
        <input type="submit" onClick={this.handleSubmit} hidden />
      </form>
    );
  }
}
