const express = require('express');
var mongoose = require('mongoose');
var ejs = require('ejs');
var path = require('path');
var Institution = require('./models/institution.js');
var bodyParser = require('body-parser')
const app = express();

mongoose.connect('mongodb://localhost:27017/university', function(err){
    if (err) throw err
  else console.log("connected to mongodb"); 
});

// mongoose.connect('mongodb://nishant:abcd1234@ds257551.mlab.com:57551/university', function(err){
//     if (err) throw err
//   else console.log("connected to mongodb"); 
// });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser()); // pull information from html in POST
app.use('/public',express.static(path.join(__dirname, 'public')));


app.get('/insert', (req, res) => {
    res.render('insert');
});

app.post('/insertuniversity', (req, res) => {


    // console.log(req.body);
    // res.send(req.body);
    
    if(req.body.inst_level){
        if(req.body.inst_level.includes('undergraduate')) var undergraduate = true; else  var undergraduate = false;
        if(req.body.inst_level.includes('graduate')) var graduate = true;  else var graduate = false;
    }
    if(req.body.inst_calendar){
        if(req.body.inst_calendar.includes('semester')) var semester = true; else var semester = false;
        if(req.body.inst_level.includes('trimester')) var trimester = true; else   var trimester = false;
    }
    if(req.body.inst_onlinecourseavailability){
        if(req.body.inst_onlinecourseavailability == 'yes') var onlinecourseavailability = true; else var onlinecourseavailability = false;
    }
    if(req.body.inst_scholarship){
        if(req.body.inst_scholarship == 'yes') var scholarship = true; else   var scholarship = false;
    }

    var instution = new Institution({
        inst_name: req.body.inst_name,
        inst_state: req.body.inst_state,
        inst_fulladdress: req.body.inst_address,
        inst_phone: req.body.inst_phone,
        inst_fee: req.body.inst_fee,
        inst_rankworld: req.body.inst_rankworld,
        inst_rankaustralia: req.body.inst_rankaustralia,
        inst_cityexpensemonthly: req.body.inst_monthlycityexpense,
        inst_totalstudent: req.body.inst_totalstudents,
        inst_type: req.body.inst_type,
        inst_minielts: req.body.inst_minielts,
        inst_onlinecourseavailability: onlinecourseavailability,
        inst_collegeuni: req.body.inst_collegeuni,
        inst_url: req.body.inst_url,
        inst_image: req.body.inst_image,
        inst_affilatedto: req.body.inst_affilatedto,
        inst_scholarship: scholarship,
        inst_noofintakes: req.body.inst_numberofintakes,
        course: req.body.inst_course,
        level:{
            undergraduate: undergraduate,
            graduate:graduate,
        },
        inst_calendarsystem:{
            semester: semester,
            trimester: trimester
        }
    });

    // console.log(instution);
    instution.save(err =>{
        if (err) return res.status(500).send(err);
        return res.status(200).send(instution);
    })

});


app.get('/', (req, res) => {
                 
            // res.send(courses);
            // console.log(courses);
            res.render('index');
      
});

app.post('/recommend', (req, res)=>{
    console.log(req.body);
    

    var query_ielts = req.body.ielts;
    var query_course = req.body.course;
    
    var query_level = req.body.level;
    var query_onlinecourseavailability = (req.body.onlinecourse == '1'? true : false);
    var query_scholarship =  (req.body.scholarship == '1'? true : false);
    var query_inst_type = req.body.institutiontype;
    // var query_calendarsystem = 'semester';
    
    Institution.find( function(err, institution) {
        if(!err) {
            var scr = 0;
            var score = [];
            institution.forEach(inst => {
               if(inst.inst_minielts <= query_ielts) scr = scr + 1;
               if(inst.course.includes(query_course)) scr = scr + 1;
            
               if( query_level == 'undergraduate' && inst.level.undergraduate == true) scr = scr + 1;
               if( query_level == 'graduate' && inst.level.graduate == true) scr = scr + 1;
            //    if( query_level == 'postgraduate' && inst.level.postgraduate == true) scr = scr + 1;
               
               if(query_onlinecourseavailability == inst.inst_onlinecourseavailability) scr = scr + 1;
               if(query_scholarship == inst.inst_scholarship) scr = scr + 1;
               if(query_inst_type == inst.inst_type) scr = scr + 1;
               
            //    if( query_calendarsystem == 'yearly' && inst.inst_calendarsystem.yearly == true) scr = scr + 1;
            //    if( query_calendarsystem == 'semester' && inst.inst_calendarsystem.semester == true) scr = scr + 1;
            //    if( query_calendarsystem == 'trimester' && inst.inst_calendarsystem.trimester == true) scr = scr + 1;

             score.push({
                 inst: inst,
                 score: scr
             });
            

             scr = 0;
            });
            score.sort(function(a, b){return b.score - a.score});
            // console.log(score);
            var result = [];
            for(var j = 0 ;j< 5; j++){
                result.push(score[j].inst);
            }
            res.render('result', {result: result});

          } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
    });
    
   
    // var result = [];
    // institution.forEach(inst => {
    //     score.forEach(scr => {
    //         if(scr.id == inst._id && result.length < 5){
    //             result.push(inst);
    //         }
    //     })
    // });
    // console.log(result);

});
 
app.get('/detail/:id', (req, res) => {
    Institution.findById(req.params.id, function(err, institution){
        if(err){
           
            console.log(err);
        } else {
            res.render('detail', {institution: institution});
            // console.log(institution);
        }
    });
});



app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'));