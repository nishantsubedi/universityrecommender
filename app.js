const express = require('express');
var mongoose = require('mongoose');
var ejs = require('ejs');
var path = require('path');
var Institution = require('./models/institution.js');
var bodyParser = require('body-parser')
const app = express();
/*
mongoose.connect('mongodb://localhost:27017/university', function(err){
    if (err) throw err
  else console.log("connected to mongodb"); 
});*/

 mongoose.connect('mongodb://nishant:abcd1234@ds257551.mlab.com:57551/university', function(err){
     if (err) throw err
   else console.log("connected to mongodb"); 
 });


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
    var query_onlinecourseavailability = req.body.onlinecourse;
    var query_scholarship =  req.body.scholarship ;
    var query_inst_type = req.body.institutiontype;
    
    var cal_ielts = (a, b) => {
        if(a <= b) return 1;
        else return 0;
    };
   
    var cal_level = (a, b) => {
        if(a == b) return 1;
        else return 0;
    };
   
    var check_course = (a, b) => {
        if(b.includes(a)) return 1;
        else return 0;
    };
    var query_matrix = {
        ielts55 : cal_ielts(5.5, query_ielts),
        ielts6 : cal_ielts(6, query_ielts),
        ielts65 : cal_ielts(6.5, query_ielts),
        ielts7 : cal_ielts(7, query_ielts),
        ielts75 : cal_ielts(7.5, query_ielts),
        ielts8 : cal_ielts(8, query_ielts),
        undergraduate: cal_level('undergraduate', query_level),
        graduate: cal_level('graduate', query_level),
        onlinecourseyes: cal_level('1', query_onlinecourseavailability),
        onlinecourseno: cal_level('2', query_onlinecourseavailability),
        scholarshipyes: cal_level('1', query_scholarship),
        scholarshipno: cal_level('2', query_scholarship),
        public: cal_level('public', query_inst_type),
        private: cal_level('private', query_inst_type),
        Accountancy: cal_level('Accountancy', query_course),
        Agriculture: cal_level('Agriculture', query_course),
        Arts_and_Humanities: cal_level('Arts and Humanities', query_course),
        Business_Administration: cal_level('Business Administration', query_course),
        Civil_Engineering: cal_level('Civil Engineering', query_course),
        Civil_Security: cal_level('Civil Security', query_course),
        Computer_Science: cal_level('Computer Science', query_course),
        Culture: cal_level('Culture', query_course),
        Dental: cal_level('Dental', query_course),
        Design: cal_level('Design', query_course),
        Electrical_and_Electronic_Engineering: cal_level('Electrical and Electronic Engineering', query_course),
        Film_Study: cal_level('Film Study', query_course),
        Finance: cal_level('Finance', query_course),
        Health_Science: cal_level('Health Science', query_course),
        Hospitality: cal_level('Hospitality', query_course),
        Hotel_Management: cal_level('Hotel Management', query_course),
        Information_Technology: cal_level('Information Technology', query_course),
        Law: cal_level('Law', query_course),
        Leadership: cal_level('Leadership', query_course),
        Management: cal_level('Management', query_course),
        Mathematics: cal_level('Mathematics', query_course),
        Mechanical_Engineering: cal_level('Mechanical Engineering', query_course),
        Medicine: cal_level('Medicine', query_course),
        Montessori: cal_level('Montessori', query_course),
        Multimedia: cal_level('Multimedia', query_course),
        Music: cal_level('Music', query_course),
        Nursing: cal_level('Nursing', query_course),
        Photography: cal_level('Photography', query_course),
        Physical_Education: cal_level('Physical Education', query_course),
        Physics: cal_level('Physics', query_course),
        Physiotherapy: cal_level('Physiotherapy', query_course),
        Psychology: cal_level('Psychology', query_course),
        Public_Health: cal_level('Public Health', query_course),
        Religious_Education: cal_level('Religious Education', query_course),
        Social_Science: cal_level('Social Science', query_course),
        Sports: cal_level('Sports', query_course),
        Theology: cal_level('Theology', query_course),
        Tourism: cal_level('Tourism', query_course),
        Visual_Arts: cal_level('Visual Arts', query_course)
    };
    var query_vector = [];
    Object.entries(query_matrix).forEach(
        ([key, value]) => query_vector.push(value)
    );
    // console.log(query_vector.length);
    // console.log(query_matrix);
    Institution.find( function(err, institution) {
        if(!err) {
            

            var scr = 0;
            var score = [];
           
            var queryMatrix=[];
            institution.forEach(inst => {
                var document_matrix = {
                    ielts55 : cal_ielts(inst.inst_minielts, 5.5),
                    ielts6 : cal_ielts(inst.inst_minielts, 6),
                    ielts65 : cal_ielts(inst.inst_minielts, 6.5),
                    ielts7 : cal_ielts(inst.inst_minielts, 7),
                    ielts75 : cal_ielts(inst.inst_minielts, 7.5),
                    ielts8 : cal_ielts(inst.inst_minielts, 8),
                    undergraduate: cal_level(true, inst.level.undergraduate),
                    graduate: cal_level(true, inst.level.graduate),
                    onlinecourseyes: cal_level(true,  inst.inst_onlinecourseavailability),
                    onlinecourseno: cal_level(false,  inst.inst_onlinecourseavailability),
                    scholarshipyes: cal_level(true, inst.inst_scholarship),
                    scholarshipno: cal_level(false, inst.inst_scholarship),
                    public: cal_level('public', inst.inst_type),
                    private: cal_level('private', inst.inst_type),
                    Accountancy: check_course('Accountancy', inst.course),
                    Agriculture: check_course('Agriculture', inst.course),
                    Arts_and_Humanities: check_course('Arts and Humanities', inst.course),
                    Business_Administration: check_course('Business Administration', inst.course),
                    Civil_Engineering: check_course('Civil Engineering', inst.course),
                    Civil_Security: check_course('Civil Security', inst.course),
                    Computer_Science: check_course('Computer Science', inst.course),
                    Culture: check_course('Culture', inst.course),
                    Dental: check_course('Dental', inst.course),
                    Design: check_course('Design', inst.course),
                    Electrical_and_Electronic_Engineering: check_course('Electrical and Electronic Engineering', inst.course),
                    Film_Study: check_course('Film Study', inst.course),
                    Finance: check_course('Finance', inst.course),
                    Health_Science: check_course('Health Science', inst.course),
                    Hospitality: check_course('Hospitality', inst.course),
                    Hotel_Management: check_course('Hotel Management', inst.course),
                    Information_Technology: check_course('Information Technology', inst.course),
                    Law: check_course('Law', inst.course),
                    Leadership: check_course('Leadership', inst.course),
                    Management: check_course('Management', inst.course),
                    Mathematics: check_course('Mathematics', inst.course),
                    Mechanical_Engineering: check_course('Mechanical Engineering', inst.course),
                    Medicine: check_course('Medicine', inst.course),
                    Montessori: check_course('Montessori', inst.course),
                    Multimedia: check_course('Multimedia', inst.course),
                    Music: check_course('Music', inst.course),
                    Nursing: check_course('Nursing', inst.course),
                    Photography: check_course('Photography', inst.course),
                    Physical_Education: check_course('Physical Education', inst.course),
                    Physics: check_course('Physics', inst.course),
                    Physiotherapy: check_course('Physiotherapy', inst.course),
                    Psychology: check_course('Psychology', inst.course),
                    Public_Health: check_course('Public Health', inst.course),
                    Religious_Education: check_course('Religious Education', inst.course),
                    Social_Science: check_course('Social Science', inst.course),
                    Sports: check_course('Sports', inst.course),
                    Theology: check_course('Theology', inst.course),
                    Tourism: check_course('Tourism', inst.course),
                    Visual_Arts: check_course('Visual Arts', inst.course)
                };

                // console.log(document_matrix);
                var document_vector = [];
                Object.entries(document_matrix).forEach(
                    ([key, value]) => document_vector.push(value)
                );
                // console.log(document_vector.length);
                var dotProduct = 0.0;
                var distanceX = 0.0;
                var distanceY = 0.0;
            
                for(var k = 0; k < document_vector.length ;k++){
                    dotProduct += query_vector[k] * document_vector[k];
                    distanceX += query_vector[k] * query_vector[k];
                    distanceY += document_vector[k] * document_vector[k];
                }
              
                scr = dotProduct/(Math.sqrt(distanceX) * Math.sqrt(distanceY));
                // console.log(scr);
             score.push({
                 inst: inst,
                 score: scr
             });
            // console.log(documentMatrix);

             scr = 0;
            });
            score.sort(function(a, b){return b.score - a.score});
            // console.log(score);
            var result = [];
            for(var j = 0 ;j< 5; j++){
                result.push(score[j].inst);
                console.log('Name ' + score[j].inst.inst_name + ' and score : ' + score[j].score);
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