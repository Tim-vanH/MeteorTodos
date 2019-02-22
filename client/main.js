import { Template } from 'meteor/templating';
import './main.html'

//Find current timestamp
function getTime(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
    dd = '0' + dd;
    } 
    if (mm < 10) {
    mm = '0' + mm;
    } 
    var today = dd + '.' + mm + '.' + yyyy;
    return today
}


//Main code
if (Meteor.isClient) {
    db = new Mongo.Collection('userInput')

    Template.form.events({
    //Collect data
    'submit form': function(event){
        event.preventDefault();

        var textSub = event.target.addTodo.value

        var data = {
            text: textSub,
            user: 'Site',
            time: getTime()
        }
        db.insert(data);
        console.log(data)
        event.target.addTodo.value = " ";
    }
   })

   //Get todos
   Template.dbList.helpers({
        getData: function(){
            
        return db.find({});
        }
    })


    /*Todo list DEPRECATED
    var todos = ['Create an awesome app', 'Do homework', 'Relax', 'Read', 'Eat dinner'];

    Template.list.todos = function() {
        return todos;
    };
    */

    //Remove todos
    Template.dbList.events({
        'click .delete': function(event){
            event.preventDefault();
            var documentId = this._id;
            db.remove({ _id: documentId });
        }
        
    })
 }