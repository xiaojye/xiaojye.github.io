const sessionClient = window.OmidSessionClient['default'];
const { AdSession, Context, Partner, VerificationScriptResource, AdEvents, MediaEvents } = sessionClient;


const CONTENT_URL = './omweb-v1.js';
const PARTNER_NAME = 'com.harmonicinc.omsdkdemo';
const PARTNER_VERSION = '1.0.0';
const partner = new Partner(PARTNER_NAME, PARTNER_VERSION);

const SCRIPT_URL = 'https://xiaojye.github.io/static/omweb/omid-compliance-verification-script-v1.js';
const VENDOR = 'harmonic';
const VERIFICATION_PARAMETERS = '{"id": 1234, "option": true}';
const ACCESS_MODE = 'full';
const verificationScriptResources = [];
verificationScriptResources.push(new VerificationScriptResource(SCRIPT_URL, VENDOR, VERIFICATION_PARAMETERS, ACCESS_MODE));


const OMSDK_SERVICE_WINDOW = window.top;
const VIDEO_ELEMENT = document.getElementById('video-creative-element');
const context = new Context(partner, verificationScriptResources, CONTENT_URL);
context.setVideoElement(VIDEO_ELEMENT);
context.setServiceWindow(OMSDK_SERVICE_WINDOW);


const adSession = new AdSession(context);
adSession.setCreativeType('video');
adSession.setImpressionType('beginToRender');
adSession.start();


const adEvents = new AdEvents(adSession);
adEvents.loaded();
adEvents.impressionOccurred();


const mediaEvents = new MediaEvents(adSession);
VIDEO_ELEMENT.addEventListener('play', function () {
    if (typeof adEvents !== 'undefined' && adEvents.impressionOccurred) {
        mediaEvents.resume();
    }
});

VIDEO_ELEMENT.addEventListener('pause', function () {
    if (typeof adEvents !== 'undefined' && adEvents.impressionOccurred) {
        mediaEvents.pause();
    }
});

VIDEO_ELEMENT.addEventListener('ended', function () {
    if (typeof adEvents !== 'undefined' && adEvents.impressionOccurred) {
        mediaEvents.complete();
    }
});