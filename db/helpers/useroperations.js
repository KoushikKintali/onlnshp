const User = require("../models/user");
const userOperations = {
    add(userObject){
       var pr =  User.create(userObject).then((result)=>{
            console.log("Record Added ",result);
        }).catch(err=>{
            console.log("Error during add:::::::::::::: ",err);
        })
        return pr;
        // User.sync({force: true}).then(() => {
        //     // Table created
        //     User.create(userObject).then(result=>{
        //         console.log("Record Added ",result);
        //     }).catch(err=>{
        //         console.log("Error During Add ",err);
        //     })
        //   });
        
    },
    find(userObject,response,request){
        User.findAll({where:{userid:userObject.userid,password:userObject.password}}).then(
            result=>{
                if(result.length>0){
                    console.log("User Exist",userObject);
                    request.session.uid = userObject.userid;
                    console.log("Session Id::::::::::",request.session.id)
                    response.render('users/dashboard',{'user':request.session.uid});
                    // response.render('users/dashboard',{'user':userObject.userid});
                    //response.send('Welcome '+userObject.userid);
                    
                }
                else{
                    console.log("User Not Exist");
                    response.send('Invalid Userid or Password');
                }
            }   
        ).catch(err=>{
            console.log("Error is ",err);
            response.send('Error occur  during login');
        })
    },
    update(){

    },
    remove(){

    }   
}
module.exports = userOperations;