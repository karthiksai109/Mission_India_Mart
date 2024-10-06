const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

const userModel = require("../Models/userModel");
const { validateName, validateEmail, validateMobileNo, validatePassword, validatePlace, validatePincode } = require("../Validator/validator");



const registerUser = async function (req, res) {
//   try {
    res.setHeader("Access-Control-Allow-Origin","*")
      let body = req.body;
      console.log(body)
    //   if (body.address) {
    //     if(body.address[0]!='{'){
    //         return res.status(400).send({ status: false, message: "Address must be in Object Form." });
    //     }
    //     body.address = JSON.parse(body.address);
    // }

    let dataInBody = Object.keys(body);
    // console.log(dataInBody)
    let arr = ["fname", "lname", "email", "phone", "password","address"];

    for (let i = 0; i < dataInBody.length; i++) {
        let someThing = dataInBody[i];
        if (!arr.includes(someThing)) {
            return res.status(400).send({ status: false, message: `${someThing} is not a valid Property.` });
        }
    }

      let { fname, lname, email, password,address } = body;

      if (Object.keys(body).length == 0) {
          return res.status(400).send({ status: false, message: "Request body can't be empty." });
      }

      //====validations for First name====
      if (fname && typeof fname != "string") {
        console.log('err1')
          return res.status(400).send({ status: false, message: "First name must be in string" });
      }
      if (fname && !fname.trim()) {
        console.log('err2')
          return res.status(400).send({ status: false, message: "First name is required." });
      }
      if (!validateName(fname.trim())) {
        console.log('err3')
          return res.status(400).send({ status: false, message: "Enter a valid First name" });
      }

      //====validations for last name====
      if (lname && typeof lname != "string") {
          return res.status(400).send({ status: false, message: "Last name must be in string" });
      }
      if (!lname || !lname.trim()) {
          return res.status(400).send({ status: false, message: "Last name is required." });
      }
      if (!validateName(lname.trim())) {
          return res.status(400).send({ status: false, message: "Enter a valid Last name." });
      }

      //====validations for Email====
      if (email && typeof email != "string") {
          return res.status(400).send({ status: false, message: "Email must be in String." });
      }
      if (!email || !email.trim()) {
          return res.status(400).send({ status: false, message: "Email is required." });
      }
      if (!validateEmail(email.trim())) {
          return res.status(400).send({ status: false, message: "Enter a valid Email." });
      }
      const existEmail = await userModel.findOne({ email: email });
      if (existEmail) {
          return res.status(400).send({ status: false, message: "This Email is already in use, try with another one." });
      }

     
      //====validations for password====
      if (password && typeof password != "string") {
          return res.status(400).send({ status: false, message: "Password must be in string" });
      }
      if (!password || !password.trim()) {
          return res.status(400).send({ status: false, message: "password is required." });
      }
      if (!validatePassword(password.trim())) {
          return res.status(400).send({ status: false, message: "Password Must be 8-15 length,consist of mixed character and special character" });
      }

   
      //====validations for address====
      if (!address) {
          return res.status(400).send({ status: false, message: "Address is required." });
      }

      const registerUser = await userModel.create(body);
      let{ __v, ...otherData} = registerUser._doc
     
      res.status(201).send({ status: true, message: "User created successfully", data: otherData });
      //====validations for Billing address====
     
       
//   }
//   catch (err) {
//     let abc = err.message.split(" ")
//      if(abc.includes("JSON")) { return res.status(400).send({ status: false, message: "please enter valid address object..." }); }
//      return res.status(500).send({ status: false, message: err.message });
 
//    }
}



//============Router handler for Login User===============
const login = async function (req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin","*")
      const body = req.body;
      let { email, password } = body;

      if (email && typeof email != "string") {
          return res.status(400).send({ status: false, message: "email must be in string" });
      }
      if (!email || !email.trim()) {
          return res.status(400).send({ status: false, message: "Email is mandatory and can not be empty." });
      }
      email = email.toLowerCase().trim();
      if (!validateEmail(email)) {
          return res.status(400).send({ status: false, message: "Please enter a valid Email." });
      }

      if (password && typeof password != "string") {
          return res.status(400).send({ status: false, message: "password must be in string" });
      }
      if (!password || !password.trim()) {
          return res.status(400).send({ status: false, message: "Password is mandatory and can not be empty." });
      }

      const check = await userModel.findOne({ email: email,password });
      if (!check) {
          return res.status(404).send({ status: false, message: "No such user exist. Please Enter a valid Email and Passowrd." })//status code
      }
      //const passwordCompare = await bcrypt.compare(password, check.password)

    //   if (!passwordCompare) {
    //       return res.status(400).send({ status: false, message: "please provide correct credentials , Password is incorrect." });
    //   }

      const token = jwt.sign(
          { userId: check._id.toString() }, "NKTCGROUPTHREEPROJECTFIVE", { expiresIn: "10h" }
      );
      return res.status(200).send({ status: true, message: "User Login Successfull", data: { userId: check._id, token: token } });
  }
  catch (err) {
      res.status(500).send({ status: false, message: err.message })
  }
}



//===========Router handler for get user============
const getUser = async function (req, res) {

    try {
        let userId = req.params.userId;
        if (!userId) {
            return res.status(400).send({ status: false, message: "User Id is required in params" })
        }
        
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, messsge: "Invalid user Id" });
        }

        //------------------------userId matches from the token for authorization purpose-------------------------------//
        if (userId != req.token) {
          return res.status(403).send({ status: false, message: "You are not authorize to update." });
      }
        
        const getData = await userModel.findById({ _id: userId }).select({__v:0});
        if (!getData) { return res.status(404).send({ status: false, message: "User Id is not present in DataBase" }) }

        return res.status(200).send({ status: true, message: "User profile details", data: getData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message, type:error.type})
    }

}


//===========router handler for Update user================
const updateUsers = async (req, res) => {
    try {
        let userId = req.params.userId

        if (!userId || (userId && userId.trim() == "")) {
            return res.status(400).send({ status: false, message: " userId cant be empty" })
        }
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: " please enter valid userId..." })
        }
        let isUserId = await userModel.findOne({ _id: userId }).lean()
        if (!isUserId) {
            return res.status(404).send({ status: false, message: "sorry we can't find userId in our collection... " })
        }

        //====authorization part=====
        if (isUserId._id != req.token) {
            return res.status(403).send({ status: false, message: "You are not authorize to update." });
        }

        let data = req.body
        let files = req.files
        if ((files) && (files.length > 0)) {

          let uploadFileURL = await uploadFile(files[0])
          data.profileImage = uploadFileURL

      }
        if(Object.keys(data).length == 0){ return res.status(400).send({status:false, message: "please provide some attribute to update..."})}
        let dataInBody = Object.keys(data);
        let arr = ["fname", "lname", "email", "phone", "password", "address", "profileImage"];
    

        for (let i = 0; i < dataInBody.length; i++) {
            let someThing = dataInBody[i];
            if (!arr.includes(someThing)) {
                return res.status(400).send({ status: false, message: `${someThing} is not a valid Property.` });
            }
        }
        let { fname, lname, email, password, phone, profileImage, address } = data

        if (fname) {
            if (fname && typeof fname != "string") {
                return res.status(400).send({ status: false, message: "First name must be in string" });
            }
            if (!validateName(fname.trim())) {
                return res.status(400).send({ status: false, message: "Enter a valid First name" });
            }
        }

        if (lname) {
            if (lname && typeof lname != "string") {
                return res.status(400).send({ status: false, message: "Last name must be in string" });
            }
            if (!validateName(lname.trim())) {
                return res.status(400).send({ status: false, message: "Enter a valid Last name." });
            }
        }

        //====validations for Email====
        if (email) {
            if (email && typeof email != "string") {
                return res.status(400).send({ status: false, message: "Email must be in String." });
            }
            if (!validateEmail(email.trim())) {
                return res.status(400).send({ status: false, message: "Enter a valid Email." });
            }
            const checkEmail = await userModel.findOne({ email: email });
            if (checkEmail) {
                return res.status(400).send({ status: false, message: "This Email is already in use, try with another one." });
            }
        }

        //====validations for Phone====
        if (phone) {
            if (phone && typeof phone != "string") {
                return res.status(400).send({ status: false, message: "phone number must be in String." });
            }
            if (!validateMobileNo(phone.trim())) {
                return res.status(400).send({ status: false, message: "Enter a valid phone Number." });
            }

            const checkPhone = await userModel.findOne({ phone: phone });
            if (checkPhone) {
                return res.status(400).send({ status: false, message: "This Phone number is already in use, try with another one." });
            }
        }
        //====validations for password====
        if (password) {
            if (password && typeof password != "string") {
                return res.status(400).send({ status: false, message: "Password must be in string" });
            }

            if (!validatePassword(password.trim())) {
                return res.status(400).send({ status: false, message: "Password Must be 8-15 length,consist of mixed character and special character" });
            }
            let hashing = bcrypt.hashSync(password, 10);
            data.password = hashing;
        }


        if (address) {
            address = JSON.parse(data.address)
            //====validations for address====
            if (address && typeof address != "object") {
                return res.status(400).send({ status: false, message: "Address must be in Object Form." });
            }
            let { shipping, billing } = address;

            //====validations for shipping address====
            if (shipping!=undefined) {
                if (shipping && typeof shipping != "object") {
                    return res.status(400).send({ status: false, message: "Shipping Address must be in Object Form." });
                }
                if (shipping.street) {
                    if (shipping.street && typeof shipping.street != "string") {
                        return res.status(400).send({ status: false, message: "Street must be in string" });

                    }
                }
                if (shipping.city) {
                    if (shipping.city && typeof shipping.city != "string") {
                        return res.status(400).send({ status: false, message: "City must be in string" });
                    }
                    if (!validatePlace(shipping.city.trim())) {
                        return res.status(400).send({ status: false, message: "City is invalid, number is not allowed." });
                    }
                }


                if (shipping.pincode) {
                    if (shipping.pincode && typeof (shipping.pincode) != "string") {
                        console.log(shipping.pincode)
                        return res.status(400).send({ status: false, message: "Pincode must be in number" });
                    }

                }
            }
            //====validations for Billing address====
            if (billing != undefined) {
                if (billing && typeof billing != "object") {
                    return res.status(400).send({ status: false, message: "Billing Address must be in Object Form." });
                }

                if (billing.street) {
                    if (billing.street && typeof billing.street != "string") {
                        return res.status(400).send({ status: false, message: "Street must be in string" });
                    }
                }

                if (billing.city) {
                    if (billing.city && typeof billing.city != "string") {
                        return res.status(400).send({ status: false, message: "City must be in string" });
                    }
                    if (!validatePlace(billing.city.trim())) {
                        return res.status(400).send({ status: false, message: "City is invalid, number is not allowed." });
                    }
                }

                if (billing.pincode) {
                    if (billing.pincode && typeof billing.pincode != "string") {
                        return res.status(400).send({ status: false, message: "Pincode must be in string" });
                    }
                    if (!validatePincode(billing.pincode.trim())) {
                        return res.status(400).send({ status: false, message: "pincode is invalid, it contains only 6 digits." });
                    }
                }
            }

        }
        if(address){    //from data in req body
        let { shipping, billing } = isUserId.address    //from db= shipping:{....},billing:{...}
        let arr = Object.keys(address)    //["shipping","Billing"]
        arr.forEach((u) => {    //=>u = billing or u = shipping
            if (u == "shipping" || u == "billing") {
                if (u == "shipping" && address[u] != undefined) {
                    let Arr = ["street", "city", "pincode"]   //=>Arr[0]==street
                    for (let i = 0; i < 3; i++) {
                        if (address[u][Arr[i]] != undefined) {    //address[shipping][street]
                            shipping[Arr[i]] = address[u][Arr[i]]     //shipping[street]=address[shipping][street]
                        }                                          //shipping is from db 
                                                                 //address is from body
                    }
                }
                if (u == "billing" && address[u] != undefined) {
                    let Arr = ["street", "city", "pincode"]
                    for (let i = 0; i < 3; i++) {
                        if (address[u][Arr[i]] != undefined) {
                            billing[Arr[i]] = address[u][Arr[i]]
                        }
                    }
                }
            }
        })
    
        address.shipping = shipping
        address.billing = billing
    }
        if (address) {
            data["address"] = address
        }

        let finalUpdate = await userModel.findOneAndUpdate(
            { _id: userId },
            { ...data },
            { new: true }).select({__v:0});

        return res.status(200).send({ status: true, message: "User profile updated", data: finalUpdate });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err })
    }

}

module.exports = { registerUser, updateUsers, getUser, login };