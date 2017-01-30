# tackle.js
Tackle's plug and play library enabling Tackle widget and api access functionality for third party developers

<div class="title">
                    <h1>Docs</h1>
                </div>
                <div id="start">
                    <h2>Getting Started</h2>
                    <p>Welcome to Tackle! We're excited to partner with you. We've made getting Tackle up and running easy with our developer tools and library.</p>
                    <p>To get started with Tackle you'll need to add the following script tag to your application:</p>
                    <pre><code class="language-html">&lt;script type="text/javascript" src="https://www.tacklehealth.com/tackle.js"&gt;&lt;/script&gt;</code></pre>
                    <p>If you're planning on using our stylesheets in the widget you will also need to include:</p>
                    <pre><code class="language-html">&lt;link rel="stylesheet" type="text/css" href="https://www.tacklehealth.com/tackle.css"&gt;&lt;/link&gt;</code></pre>
                    <p>Please note the capitalization in the file paths.</p>
                    <p>The Tackle library currently requires JQuery to do some of the more complicated element as object event handling and attachment. If you plan to use only the helper functions, not the widget, and are unable to include JQuery in your project, please contact us and we can provide you with a workaround.</p>
                </div>
                <div id="widget" style="margin-bottom:3em">
                    <h2>Widget</h2>
                    <div class="team_member">
                        <h4>Initializing the widget</h4>
                        <p>Once you have included Tackle's library as part of your system, initializing the widget for any practice is easy. You will need the secret key from the practice or system. Then initialize like so:</p>
                        <pre><code class="language-javascript">var widget = $("#target-container").tackleWidget({
    key:"fooKey"
})</code></pre>
                        <p>This will create the widget within the container of your preference.</p>
                        <h4>Widget Options</h4>
                        <p>When instantiating the widget there are a number of properties you can set:</p>
                        <table class="options-table">
                            <tbody>
                                <tr>
                                    <td class="option-title">providers</td>
                                    <td class="option-info">Comma separated STRING of provider identification tags to limit the returned headers and timeslots</td>
                                </tr>
                                <tr>
                                    <td class="option-title table-row-property">appointmentTypes</td>
                                    <td class="option-info table-row-property">Comma separated STRING of appointment type identification tags to limit the returned headers and timeslots</td>
                                </tr>
                                <tr>
                                    <td class="option-title">height</td>
                                    <td class="option-info">Sets the height of the timeslot display box</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>NOTE: only providers with public appointment types will be listed in the widget.</p>
                    </div>
                </div>
                <div id="advanced" style="margin-bottom:3em">
                    <h2>Advanced Usage</h2>
                    <div class="team_member">
                        <h4>Accessing the API</h4>
                        <p>For developers that want to build their own custom solutions instead of using our built in widget, Tackle provides helper functions to manage and simplify calls to Tackle's API.</p>
                        <h4>Key Setting</h4>
                        <p>Before any successful calls can be made you will have to set the secret key as provided by the practice/system. Once you have the key simply run:</p>
                        <pre><code class="language-javascript">Tackle.setKey("fooKey")</code></pre>
                        <p>You must do this before making any other calls using the Tackle library. Calling setKey will also validate the key and inform you if there are any inconsistencies in the format.</p>
                        <h4>Data and Error Handling</h4>
                        <p>For successful calls the response will be an object with an error value of false and a data element containing the response as an object from the server."</p>
                        <pre><code class="language-javascript">{error:false, data:fooObject}</code></pre>
                        <p>This way you can always check whether there was error when making the call. If there is an error the response will look like this:</p>
                        <pre><code class="language-javascript">{error:true, status:fooStatusInt, message:"barErrorMessage"}</code></pre>
                        <p>In this case, status will be an integer with the HTTP status code. The message will be the message as displayed from our api.</p>
                        <h4>Resources</h4>
                        <pre><code class="language-javascript">Tackle.resources({<i>options</i>}, callback)</code></pre>
                        <p>The first call you will want to make after you have set the key is to the resources function. This gets the providers associated with your defined key.</p>
                        <p>Below is an example data response:</p>
                        <pre><code class="language-javascript">{[{
“id”:"a1b2c3d4e5f6g7", 
“Offices”:[
{“officeName”:"Smith Family Practice",
 “address”:"12345 Main Street", 
 “city”:"New York", 
 “state”:"NY",
 “zipCode”:"10001",
“timezone”:"America/New_York",  
“phoneNumber”:"(123) 456-7890"}
],
“firstName”:"Sarah",
“lastName”:"Smith",
“degree”:"DDS",
“specialty”:"Generalist"
“systemId”:"z1y2x3v4",
“appointmentTypes”:[
{“typeId”:1, 
“name”:"Cleaning", 
“description”:"A standard cleaning.", 
“Multiplier”:2},
 {“typeId”:2, 
“name”:"X-ray", 
“description”:"An x-ray.", 
“Multiplier”:1}
]}]}</code></pre>
                        <h4 style="margin-top:1em;">Time</h4>
                        <p>Using the results of your resources call you wil be able to call the Time function.</p>
                        <pre><code class="language-javascript">Tackle.time({<i>options</i>}, callback)</code></pre>
                        <p>Like the Resources function, the Time function requires a callback, but also has a few required options:</p>
                        <table class="options-table">
                            <tbody>
                                <tr>
                                    <td class="option-title">startTime</td>
                                    <td class="option-info">Integer unix timestamp in seconds of the beginning period for which to get available timeslots</td>
                                </tr>
                                <tr>
                                    <td class="option-title table-row-property">endTime</td>
                                    <td class="option-info table-row-property">Integer unix timestamp in seconds of the ending period for which to get available timeslots</td>
                                </tr>
                                <tr>
                                    <td class="option-title">providerId</td>
                                    <td class="option-info">Identification tag of a provider associated with your defined key</td>
                                </tr>
                                <tr>
                                    <td class="option-title">appointmentTypeId</td>
                                    <td class="option-info">Identification tag of an appointment associated with the previously specified provider</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>Below is an example data response:</p>
                        <pre><code class="language-javascript">{“count”:1,
“payload”:
[{
    “id”:"12345abcd", 
    “providerFirstName”:"Sarah",
     “providerLastName”:"Smith", 
    “officeName”:"Smith Family Practice", 
    “officeAddress”:"12345 Main Street", 
    “officeCity”:"New York", 
    “officeState”:"NY",
    “officeZipCode”:"10001", 
    “officeTimezone”:"America/New_York", 
    “startTime”:123445345, 
    “endTime”:123445945, 
    “linkToBook”:"https://www.tacklehealth.com/appointment-direct/12345abcd"
}]
}</code></pre>
                    </div>
                </div>
                <div id="tag" style="margin-bottom:3em">
                    <h2>Tag Manager</h2>
                    <div class="team_member">
                        <h4>Video</h4>
                        <a href="https://www.youtube.com/watch?v=KRvbFpeZ11Y">Google Tag Manager on Youtube</a>
                        <h4>Top Line:</h4>
                        <p>Google Tag Manager enables us to share logging on your client websites and Tackle pages, and for these events to be reported as if they are all occurring on your client's site. This allows you to collect data all the way through appointment booking.</p>
                        <h4>How it works:</h4>
                        <ol>
                            <li>We initialize a shared Google Tag Container that we both will have access to via the <a href="https://tagmanager.google.com/?hl=en">Google Tag Manager dashboard</a></li>
                            <li>Within this web dashboard, you can specify all of the logging pixels that you want to use to track events on Tackle’s appointment request flow. These tracking pixels and the events that you wish to capture with them are modifiable at any time from this dashboard and will take effect immediately</li>
                            <li>We recommend implementing the Google Tag code on any page that has scheduling capabilities-- either those with the widget or any custom built pages using our API.  We also implement it on all steps of the checkout that occur on www.tacklehealth.com, which have been triggered from your client's website</li>
                            <li>When a user visits any webpage that has the Google Tag code on it, it will initialize all of the logging specified on the dashboard-- as though this tracking code were implemented directly on the page</li>
                            <li>Events captured by this logging will flow naturally into the existing dashboards that you use to support your analytics, including Google Analytics, FB Insights, and many others, as though the events on Tackle are happening on your own website</li>
                            <li>You can use these captured events to measure conversions, and also to segment your audience by how far they gone in the conversion funnel, and to re-target them to complete their bookings</li>
                        </ol>
                    </div>
                </div>
                <div id="partnerships" style="margin-bottom:3em">
                    <h2>Partnerships</h2>
                    <div class="team_member">
                        <p>Tackle partners with developers to distribute Tackle's product and augment the developer's offering. If you would like to get in touch with us please reach out at <a href="mailto:info@tacklehealth.com">info@tacklehealth.com</a></p>
                    </div>
                </div>
            </div>
