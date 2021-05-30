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
const facebook = document.getElementById('OrganizerFacebook');
const line = document.getElementById('OrganizerLine');
const tel = document.getElementById('OrganizerTel');

const inputPictureButton = document.getElementById('InputPicture');
const submitButton = document.getElementById('submit');
var event_pic = '';

const time = new Date();
const timestamp = time.toString()

const database = firebase.firestore();

inputPictureButton.addEventListener('change', e => {
    document.getElementById("waitMessage").textContent = 'Please wait...';
    console.log(waitMessage)
});

inputPictureButton.addEventListener('change', e => {
    e.preventDefault();
    const ref = firebase.storage().ref();
    const file = document.querySelector("#InputPicture").files[0];
    if(!file){
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
    e.preventDefault();
    var event_date_timeline = new Date(event_date.value);
    var closing_date_timeline = new Date(closing_date.value);
    var arrayOfFaculty = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        arrayOfFaculty.push(checkboxes[i].value)
    }

    if (!event_pic){
        event_pic = 'https://firebasestorage.googleapis.com/v0/b/mod-meetup.appspot.com/o/1200px-No_image_3x4.svg.png?alt=media&token=50f302d8-52ce-4ddc-9b88-346f9926c8a7'
    }

    database.collection('event').doc(String(event_name)).set({
        event_name: event_name.value,
        description: description.value,
        event_pic: event_pic,
        event_place: event_place.value,
        faculty: arrayOfFaculty,
        max_enroll: max_enroll.valueAsNumber,
        closing_date: closing_date_timeline,
        event_date: event_date_timeline,
        earning_hour: { activity: activity.valueAsNumber, post: post.valueAsNumber, volunteer: volunteer.valueAsNumber },
        organizer_info: { email: email.value, facebook: facebook.value, line: line.value, tel: tel.value },
        dateCreate: timestamp
    })
        .then(() => { console.log('Event Created !'); })
        .catch(error => { console.error(error) });
});
