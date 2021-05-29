var fields = "#InputName, #InputEndTime, #InputLocation, #ParticipantNum, #InputDate";

$(fields).on('change', function () {
    if (allFilled()) {
        $('#submit').removeAttr('disabled');
    } else {
        $('#submit').attr('disabled', 'disabled');
    }
});

function allFilled() {
    var filled = true;
    $(fields).each(function () {
        if ($(this).val() == '') {
            filled = false;
        }
    });
    return filled;
}

function facultyCheck() {
    //สร้าง String จากคณะที่ถูกเลือก
    var faculty;
    if (document.getElementById("faculty1").checked == true) {
        if (faculty == null) {
            faculty = document.getElementById("faculty1").value;
        }
        else {
            faculty = faculty + ", " + document.getElementById("faculty1").value;
        }

    }
    if (document.getElementById("faculty2").checked == true) {
        if (faculty == null) {
            faculty = document.getElementById("faculty2").value;
        }
        else {
            faculty = faculty + ", " + document.getElementById("faculty2").value;
        }

    }
    if (document.getElementById("faculty3").checked == true) {
        if (faculty == null) {
            faculty = document.getElementById("faculty3").value;
        }
        else {
            faculty = faculty + ", " + document.getElementById("faculty3").value;
        }

    }
    if (document.getElementById("faculty4").checked == true) {
        if (faculty == null) {
            faculty = document.getElementById("faculty4").value;
        }
        else {
            faculty = faculty + ", " + document.getElementById("faculty4").value;
        }

    }
    if (document.getElementById("faculty5").checked == true) {
        if (faculty == null) {
            faculty = document.getElementById("faculty5").value;
        }
        else {
            faculty = faculty + ", " + document.getElementById("faculty5").value;
        }

    }
    if (document.getElementById("faculty6").checked == true) {
        if (faculty == null) {
            faculty = document.getElementById("faculty6").value;
        }
        else {
            faculty = faculty + ", " + document.getElementById("faculty6").value;
        }

    }
    if (document.getElementById("faculty7").checked == true) {
        if (faculty == null) {
            faculty = document.getElementById("faculty7").value;
        }
        else {
            faculty = faculty + ", " + document.getElementById("faculty7").value;
        }

    }
    //เก็บ String ที่สร้างไว้

    var arrayOfFaculty = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
    for (var i = 0; i < checkboxes.length; i++) {
        arrayOfFaculty.push(checkboxes[i].value)
    }
    sessionStorage.setItem("faculty", faculty);
    sessionStorage.setItem("facultyList", arrayOfFaculty);

    console.log("RRRRRRRRRRR")

}

function setSessionStorage() {
    //เก็บ values ใน sessionStorage
    sessionStorage.setItem("event_name", event_name.value);
    sessionStorage.setItem("event_date", event_date.value);
    sessionStorage.setItem("closing_date", closing_date.value);
    sessionStorage.setItem("event_place", event_place.value);
    sessionStorage.setItem("email", email.value);
    sessionStorage.setItem("tel", tel.value);
    sessionStorage.setItem("max_enroll", max_enroll.valueAsNumber);
    sessionStorage.setItem("activity", activity.valueAsNumber);
    sessionStorage.setItem("volunteer", volunteer.valueAsNumber);
    sessionStorage.setItem("post", post.valueAsNumber);
    sessionStorage.setItem("description", description.value);
    sessionStorage.setItem("event_pic", event_pic);
}

const event_name = document.getElementById('InputName');
const description = document.getElementById('detail');
const event_place = document.getElementById('InputLocation');
const faculty = document.getElementById('faculty1', 'faculty2', 'faculty3', 'faculty4', 'faculty5');
const max_enroll = document.getElementById('ParticipantNum');

//date
const closing_date = document.getElementById('InputEndTime');
const event_date = document.getElementById('InputDate');

//map
const activity = document.getElementById('StudentHour');
const post = document.getElementById('FinalHour');
const volunteer = document.getElementById('VolunteerHour');

const email = document.getElementById('OrganizerMail');
const tel = document.getElementById('OrganizerTel');

const inputPictureButton = document.getElementById('InputPicture');
const submitButton = document.getElementById('submit');

var event_pic = '';

const time = new Date();
const timestamp = time.toString()
const minTime = time.toISOString().slice(0, 16);

const database = firebase.firestore();



inputPictureButton.addEventListener('click', e => {
    document.getElementById("waitMessage").textContent = 'Please wait...';
    console.log(waitMessage)
});

event_date.addEventListener('click', e => {
    document.getElementById('InputDate').min = minTime;
    console.log(minTime);
});

closing_date.addEventListener('click', e => {
    document.getElementById('InputEndTime').min = minTime;
    if (event_date.value) {
        document.getElementById('InputEndTime').max = event_date.value;
    }
    else {
        document.getElementById('InputEndTime').max = minTime;
    }
    console.log(event_date.value);
});

inputPictureButton.addEventListener('change', e => {
    e.preventDefault();
    const ref = firebase.storage().ref();
    const file = document.querySelector("#InputPicture").files[0];
    if (!file) {
        document.getElementById("waitMessage").textContent = '';
        return console.log('No file selected');
    }
    const name = new Date() + '-' + file.name;
    const metadata = {
        contentType: file.type
    }
    const task = ref.child(name).put(file, metadata)

    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            document.getElementById("waitMessage").textContent = 'อัปโหลดรูปเสร็จแล้ว';
            console.log(url);
            event_pic = url;

        });
});

submitButton.addEventListener('click', e => {
    facultyCheck();
    setSessionStorage();
    // database.collection('event').where('event_name', '==', event_name.value).get()
    //     .then((docSnapshot) => {
    //         if (!docSnapshot.empty) {
    //             console.log('Doc Exist');
    //             alert('ชื่อกับกิจกรรมซํ้ากับในระบบ กรุณากรอกชื่อใหม่');
    //             document.getElementById("form").action = "index.html";
    //         }
    //         else{
    //             document.getElementById("form").action = "summary.html";
    //         }
    //     });
});

// confirmButton.addEventListener('click', e => {
//     e.preventDefault();
//     var event_date_timeline = new Date(event_date.value);
//     var closing_date_timeline = new Date(closing_date.value);
//     var arrayOfFaculty = []
//     var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

//     for (var i = 0; i < checkboxes.length; i++) {
//         arrayOfFaculty.push(checkboxes[i].value)
//     }

//     if (!event_pic) {
//         event_pic = 'https://firebasestorage.googleapis.com/v0/b/mod-meetup.appspot.com/o/1200px-No_image_3x4.svg.png?alt=media&token=50f302d8-52ce-4ddc-9b88-346f9926c8a7'
//     }

//     database.collection('event').where('event_name', '==', event_name.value).get()
//         .then((docSnapshot) => {
//             if (!docSnapshot.empty) {
//                 console.log('Doc Exist')
//                 alert('ชื่อกับกิจกรรมซํ้ากับในระบบ กรุณากรอกชื่อใหม่')
//             }
//             else {
//                 console.log('Doc does not Exist')
//                 database.collection('event').doc(timestamp).set({
//                     event_name: event_name.value,
//                     description: description.value,
//                     event_pic: event_pic,
//                     event_place: event_place.value,
//                     faculty: arrayOfFaculty,
//                     max_enroll: max_enroll.valueAsNumber,
//                     closing_date: closing_date_timeline,
//                     event_date: event_date_timeline,
//                     earning_hour: { activity: activity.valueAsNumber, post: post.valueAsNumber, volunteer: volunteer.valueAsNumber },
//                     organizer_info: { email: email.value, tel: tel.value }
//                 })
//                     .then(() => { 
//                         console.log('Event Created !'); 
//                         //window.location.reload();
//                 })
//                     .catch(error => { console.error(error) });
//             }
//         });
// });
