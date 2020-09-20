import { Component, OnInit } from '@angular/core';
import { formatDate} from '@angular/common';

import CalendarJson from '../../assets/acme-search/calendar.json';
import ContactsJson from '../../assets/acme-search/contacts.json';
import DropBoxJson from '../../assets/acme-search/dropbox.json';
import SlackJson from '../../assets/acme-search/slack.json';
import TweetJson from '../../assets/acme-search/tweet.json';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  // To store user input
  searchTerm = '';

  //For calender results
  calendarResult = [];
  calendarHeaders = ['title', 'invitees', 'date'];

  //For contacts results
  contactsResult = [];
  contactsHeaders = ['name', 'company', 'emails', 'phones', 'last_contact'];

  //For dropbox results
  dropBoxResult = [];
  dropBoxHeaders = ['title', 'shared_with',  'path', 'created'];

  //For slack results
  slackResult = [];
  slackHeaders = ['channel', 'author', 'message', 'timestamp'];

  //For tweet results
  tweetResult = [];
  tweetHeaders = ['user', 'message', 'timestamp'];

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  // For result headers
  resultHeader = false;
  emptySearch = false;
  noResult = false;

  constructor() {}

  // Function to store user input
  onKey(event: any) {
      this.searchTerm = event.target.value.toLowerCase();
  }

  // Function to return true if a list contains the string passed
  containsAny(str, list) {
    for (let i = 0; i != list.length; i++) {
       let substring = list[i];
       if (str.indexOf(substring) != - 1) {
         return true;
       }
    }
    return false;
  }

  // Function to return a user friendly version of dates
  userFriendlyDate(date){
      let dateInFormat = formatDate(date ,'MM-dd-yyyy', 'en-US');
      let monthNumber = parseInt(dateInFormat.toString().substring(0, 2));
      let day = dateInFormat.toString().substring(3, 5);
      let year = dateInFormat.toString().substring(6, 10);
      let calendarDate = this.months[monthNumber - 1] + ' ' + day + ', ' + year;

      return calendarDate
  }

  // Function to search calendarJson using user input and matching terms
  //   and adds result to a list to be displayed to the user
  searchCalendar(): void{
    for(let i = 0; i < CalendarJson['calendar'].length; i++){
      let matching_terms = CalendarJson['calendar'][i]['matching_terms'];

      if(this.containsAny(this.searchTerm, matching_terms)){
        let date = CalendarJson['calendar'][i]['date'];
        CalendarJson['calendar'][i]['date'] = this.userFriendlyDate(date);
        this.calendarResult.push(CalendarJson['calendar'][i]);
      }
    }
  }

   // Function to search contactsJson using user input and matching terms
   //  and adds result to a list to be displayed to the user
   searchContacts(): void{
      for(let i = 0; i < ContactsJson['contacts'].length; i++){
         let matching_terms = ContactsJson['contacts'][i]['matching_terms'];

         if(this.containsAny(this.searchTerm, matching_terms)){
            let date = ContactsJson['contacts'][i]['last_contact'];
            ContactsJson['contacts'][i]['last_contact'] = this.userFriendlyDate(date);
            this.contactsResult.push(ContactsJson['contacts'][i]);
         }
      }
   }

   // Function to search dropboxJson using user input and matching terms
   //  and adds result to a list to be displayed to the user
   searchDropBox(): void{
      for(let i = 0; i < DropBoxJson['dropbox'].length; i++){
         let matching_terms = DropBoxJson['dropbox'][i]['matching_terms'];

         if(this.containsAny(this.searchTerm, matching_terms)){
            let date = DropBoxJson['dropbox'][i]['created'];
            DropBoxJson['dropbox'][i]['created'] = this.userFriendlyDate(date);
            this.dropBoxResult.push(DropBoxJson['dropbox'][i]);
         }
      }
   }

   // Function to search slackJson using user input and matching terms
   //  and adds result to a list to be displayed to the user
   searchSlack(): void{
      for(let i = 0; i < SlackJson['slack'].length; i++){
         let matching_terms = SlackJson['slack'][i]['matching_terms'];

         if(this.containsAny(this.searchTerm, matching_terms)){
             let date = SlackJson['slack'][i]['timestamp'];
             SlackJson['slack'][i]['timestamp'] = this.userFriendlyDate(date);
             this.slackResult.push(SlackJson['slack'][i]);
         }
      }
   }

   // Function to search tweetJson using user input and matching terms
   //  and adds result to a list to be displayed to the user
   searchTweet(): void{
      for(let i = 0; i < TweetJson['tweet'].length; i++){
         let matching_terms = TweetJson['tweet'][i]['matching_terms'];

         if(this.containsAny(this.searchTerm, matching_terms)){
            let date = TweetJson['tweet'][i]['timestamp'];
            TweetJson['tweet'][i]['timestamp'] = this.userFriendlyDate(date);
            this.tweetResult.push(TweetJson['tweet'][i]);
         }
      }
   }

   // Function to empty the search result lists
   emptyResultLists(): void{
        this.calendarResult = []
        this.contactsResult = []
        this.dropBoxResult = []
        this.slackResult = []
        this.tweetResult = []
   }

   // Function to search all json documents for results
   searchAllJson(): void{
       this.searchCalendar();
       this.searchContacts();
       this.searchDropBox();
       this.searchSlack();
       this.searchTweet();
   }

   // Function to display headers based of search results
   //  and user input
   displayHeaders(): void{
     if(this.calendarResult.length == 0 &&
          this.contactsResult.length == 0 &&
          this.dropBoxResult.length  == 0 &&
          this.slackResult.length    == 0 &&
          this.tweetResult.length    == 0){
          this.resultHeader = false;
          if(this.searchTerm.length == 0){
             this.emptySearch = true;
             this.noResult = false;
          }else{
             this.emptySearch = false;
             this.noResult = true;
          }
       }else{
           this.resultHeader = true;
           this.noResult = false;
           this.emptySearch = false;
       }
   }

  // Function to trigger search functions when the search
  //  button is clicked
  search(event): void{
      console.log('search button clicked');
      this.emptyResultLists();
      this.searchAllJson();
      this.displayHeaders();
  }
}
