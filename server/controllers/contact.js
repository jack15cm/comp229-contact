let express = require ('express');
let router = express.Router();
let mongoose = require('mongoose');
let Contact = require('../model/contacts');

/*
 A compare function for sorting contact name
*/
function compare( a, b ) {
    if ( a.contactName < b.contactName ){
      return -1;
    }
    if ( a.contactName > b.contactName ){
      return 1;
    }
    return 0;
  }


module.exports.displayContactList = (req,res,next)=>{
   
    if(!req.user){
        res.redirect('/');
    }
   
   
    Contact.find((err,contactList)=>{
        if(err)
        {
        return console.error(err);
        }
        else
        {
         
         //sorting 
         contactList.sort( compare );
            //console.log(BookList);
         res.render('contact/list', 
         {title:'Contact List', ContactList:contactList,
        displayName:req.user ? req.user.displayName:''});
        }
    });
}

module.exports.displayAddPage = (req,res,next)=>{
    res.render('contact/add',{title:'Add Contact',
    displayName:req.user ? req.user.displayName:''})

}

module.exports.processAddPage = (req,res,next)=>{
    
    console.log("hello");
    console.log("contactName:"+req.body.contactName);
    console.log("contactumber:"+req.body.contactNumber);
    console.log("email:"+req.body.email);
   
    
    
    let newContact = Contact({
        "contactName": req.body.contactName,
        "contactNumber":req.body.contactNumber,
        "email":req.body.email,
        "username":req.body.contactName
        
    });
    Contact.create(newContact,(err,Contact)=>{
        if(err)
        {
            console.log("***add error ***");
            console.log(err);
            res.end(err);
        }
        else
        {
        res.redirect('/contactList');
        }
    });
    }
    
        module.exports.displayEditPage = (req,res,next)=>{
            let id = req.params.id;
            Contact.findById(id,(err,contactToEdit)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.render('contact/edit',{title:'Edit Contact', contact: contactToEdit,
                    displayName:req.user ? req.user.displayName:''});
                }
            
            });
        }

        module.exports.processEditPage = (req,res,next)=>{
            let id = req.params.id
            console.log(req.body);
            let updatedContact = Contact({
                "_id":id,
                "contactName":req.body.contactName,
                "contactNumber":req.body.contactNumber,
                "email":req.body.email
                
            });
            Contact.updateOne({_id:id}, updatedContact,(err)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.redirect('/contactList');
                }
            });
        }

        module.exports.performDelete= (req,res,next)=>{
            let id = req.params.id;
            Contact.remove({_id:id},(err)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.redirect('/contactList');
                }
                
            });
            }
        