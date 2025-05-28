/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Suraj Singh Thakur",
  title: "Hi all, I'm Suraj",
  subTitle: emoji(
    "A passionate DevOps Engineer 🚀 having an experience of building complete infrastructure using IaC and CI/CD pipeline using global tools and cloud devops tools."
  ),
  resumeLink:
    "https://drive.google.com/file/d/12Ztb_acOKf_slRDkL023qwlaAQzc2xz_/view?usp=drive_link", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/sunsunny-hub",
  linkedin: "www.linkedin.com/in/suraj-singh-thakur-👨‍💻👨‍🔧-0a6836100",
  gmail: "surajsingh5233@gmail.com",
//  gitlab: "https://gitlab.com/saadpasta",
  facebook: "https://www.facebook.com/SURAJSINGH000",
  medium: "https://medium.com/@surajsingh5233",
//  stackoverflow: "https://stackoverflow.com/users/10422806/saad-pasta",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "CRAZY DEVOPS ENGINNER WHO WANTS TO EXPLORE EVERY TECH AUTOMATION",
  skills: [
    emoji(
      "⚡ Develop highly secure and robust cloud infrastructure for clients to operate their business."
    ),
    emoji("⚡ Product lifecycle management."),
    emoji("⚡ Enterprise application integration."),
    emoji("⚡ Product release and deployment support."),
    emoji("⚡ Custom web applications deployment with implementation of CI/CD ."),
    emoji(
      "⚡ Integration of third party services such as GitHub/ Jenkins / Docker / Cloud (AWS,Azure,GCP)"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "Jenkins",
      fontAwesomeClassname: "fab fa-jenkins"
    },
    {
      skillName: "GitHub",
      fontAwesomeClassname: "fab fa-github"
    },
    {
      skillName: "Bitbucket",
      fontAwesomeClassname: "fab fa-bitbucket"
    },
    {
      skillName: "JavaScript",
      fontAwesomeClassname: "fab fa-js"
    },
    {
      skillName: "Nodejs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "NPM",
      fontAwesomeClassname: "fab fa-npm"
    },
    {
      skillName: "SQL-database",
      fontAwesomeClassname: "fas fa-database"
    },
    {
      skillName: "AWS Cloud",
      fontAwesomeClassname: "fab fa-aws"
    },
    {
      skillName: "Azure Cloud",
      fontAwesomeClassname: "fab fa-microsoft"
    },
    {
      skillName: "Google Cloud",
      fontAwesomeClassname: "fab fa-google"
    },
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "Docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "AEMaaCS",
      fontAwesomeClassname: "fab fa-adobe"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Nagpur University",
      logo: require("./assets/images/Nagpur-University-new.png"),
      subHeader: "Bachelor of Engineering in Computer Science",
      duration: "September 2012 - April 2016",
      desc: "Overall Scored CGPA 8.07 on a scale of 10, in my 4 years of engineering academic. Also participated in verious tech-fest events",
      descBullets: [
        "Participated in Axis Sumo Boot Camp at Nagpur VNIT.",
        "Participated in Ethical Hacking event at RCOEM."
    ]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Continuous Integration and Continuous Deployment", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Cloud Migration",
      progressPercentage: "70%"
    },
    {
      Stack: "Programming",
      progressPercentage: "60%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "DevOps & Cloud Engineer",
      company: "Perficient Inc",
      companylogo: require("./assets/images/perficient-logo.jpg"),
      date: "June 2021 – Present",
      desc: "Working on various client's project, per client requirements need to development and automation.",
      descBullets: [
        "Implementation of CI/CD with DevSecOps methodology.",
        "Setup of Triggers and Scheduler for the automation.",
        "Worked on AWS Lambda with python code to pull AWS inspector report and store it in S3 bucket.",
        "Configured AWS Client VPN Endpoint for production environment."
      ]
    },
    {
      role: "Linux Administrator",
      company: "Altius Customer Service Pvt Ltd",
      companylogo: require("./assets/images/altius-logo.png"),
      date: "Nov 2019 – Sep 2021",
      desc: "Monitored and Handled the on-prem infrastructure servers as well as cloud infrastructure. Configuration of server-side applications such as Apache2, MySQL 5.7, and Tomcat 8/9.",
      descBullets: [
        "Worked on networking device Fortigate Firewall, implemented network rules and policy.",
        "Migrate all applications running on infrastructure servers on Docker Containers by using CICD Pipeline."
      ]
    },
    {
      role: "Technical Support L1",
      company: "Concentrix Pvt Ltd",
      companylogo: require("./assets/images/concentrix-logo.png"),
      date: "Mar 2018 – Apr 2019",
      desc: "Worked as Technical support for DELL, it was an inbound process B to C. My job was to troubleshoot and resolve the customer laptop hardware issue on call.",
      descBullets: [
        "On-call resolution-making as FCR.",
        "Create a Site Service Request for hardware assistance.",
        "Proper documentation of customer details, issue stated, and resolution provided."
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set tru2e or false to show Contact profile using Github, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "SOME CLIENTS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/dlba-logo.png"),
      projectName: "DLBA - Detroit Land Bank Authority",
      projectDesc: "Interacting with peers to resolve real-time challenges. Dealing with large, high-profile clients to configure and customize solutions to the client’s complex needs. Leading technical conversations and guiding clients on implementing industry best practices.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://buildingdetroit.org/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/wm-logo.png"),
      projectName: "Waste Management",
      projectDesc: "Dealing with clients’ financial data for their business analysis outcome and future planning. Involvement in workflow planning and outcome results of the workflow.",
      footerLink: [
        {
          name: "Visit Website",
          url: "https://www.wm.com/"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "AWS Certified Solutions Architect - Associate",
      subtitle:
        "My 1st cloud global certification, which gives me knowledge and skills in deploying, managing, and operating workloads on AWS as well as implementing security controls and compliance requirements.",
      image: require("./assets/images/aws-logo.png"),
      imageAlt: "AWS Badge",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.credly.com/badges/78a1103c-ecf2-4a6c-9932-565bf2b6591e/public_url"
        },
//        {
//          name: "Award Letter",
//          url: "https://drive.google.com/file/d/0B7kazrtMwm5dekxBTW5hQkg2WXUyR3QzQmR0VERiLXlGRVdF/view?usp=sharing"
//        },
//        {
//          name: "Google Code-in Blog",
//          url: "https://opensource.googleblog.com/2019/01/google-code-in-2018-winners.html"
//        }
      ]
    },
    {
      title: "Google Cloud Certified - Associate Cloud Engineer",
      subtitle:
        "My 2nd cloud global certification, which gives me knowledge to use Google Cloud Console and the command-line interface to perform common platform-based tasks to maintain one or more deployed solutions that leverage Google-managed or self-managed services on Google Cloud.",
      image: require("./assets/images/GCP-ACE.png"),
      imageAlt: "GCP Badge",
      footerLink: [
        {
          name: "Certification",
          url: "https://www.credential.net/131745c8-6602-4aff-bfe0-a07f0e6d0003"
        }
      ]
    },

    {
      title: "Microsoft Certified: Azure Administrator Associate",
      subtitle: "My 3rd cloud global certification, which gives me knoweldge to have subject matter expertise in implementing, managing, and monitoring an organization’s Microsoft Azure environment, including virtual networks, storage, compute, identity, security, and governance.",
      image: require("./assets/images/azure-logo.png"),
      imageAlt: "Azure Badge",
      footerLink: [
        {
          name: "Certification", 
          url: "https://www.credly.com/earner/earned/badge/53d13878-236f-4242-af6d-ac20752cdc84"
        },
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://sunsbeelog.blogspot.com/2022/07/transform-your-data-with-azure-data.html",
      title: "Transform Your Data with Azure Data Factory",
      description:
        "All about ADF which you should know, the ETL fundamental. 5-10 min read"
    },
    {
      url: "https://sunsbeelog.blogspot.com/2022/07/getting-started-with-matillion-etl-tool.html",
      title: "Getting Started with Matillion ETL Tool",
      description:
        "You wont find much article on matillion tool, here i bring you the matillion ETL tool to start off. 5-10 min read"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Blogs and Article Post on Linkedin",
      subtitle: "Do follow my activity as i share post and article on niche technolgies on linkedin",
      slides_url: "https://www.linkedin.com/in/suraj-singh-thakur-👨‍💻👨‍🔧-0a6836100",
      event_url: "https://www.facebook.com/events/523305116139975"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/suraj-singh-thakur5/embed/episodes/Anchor-Intro-e1tudc9"
  ],
  display: true // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
//  number: "+92-0000000000",
  email_address: "surajsingh5233@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "SurajSingh__", //Replace "twitter" with your twitter username without @
  display: true // Set true to display this section, defaults to false
};

const isHireable = true; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
