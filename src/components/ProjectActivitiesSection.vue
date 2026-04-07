<template>
  <section ref="paSection" class="activities-section py-20">
    <!-- Animated background elements -->
    <div class="bg-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="8" class="text-center mb-16">
          <transition name="title-fade">
            <div v-if="showTitle">
              <div class="title-badge mb-6">WHAT WE DO</div>
              <h2 class="section-title mb-6">
                Project <span class="text-gradient">Activities</span>
              </h2>
              <p class="section-subtitle">
                A comprehensive overview of our multi-dimensional approach to improving Sexual and Reproductive Health (SRHR) in tea garden communities.
              </p>
            </div>
          </transition>
        </v-col>
      </v-row>

      <v-row>
        <v-col 
          v-for="(activity, index) in activities" 
          :key="index" 
          cols="12" 
          sm="6" 
          md="4"
          class="d-flex"
        >
          <transition :name="'fade-slide-up'">
            <div 
              v-if="showText" 
              class="activity-card" 
              :style="{ '--delay': (index * 0.1) + 's' }"
              @click="openModal(activity)"
            >
              <div class="card-icon-container" :class="activity.color">
                <v-icon size="36" color="white">{{ activity.icon }}</v-icon>
              </div>
              
              <h3 class="card-title">{{ activity.title }}</h3>
              <p class="card-summary">{{ activity.summary }}</p>
              
              <div class="card-footer mt-auto">
                <span class="read-more-btn">
                  Read Full Report
                  <v-icon size="small" class="ml-1">mdi-arrow-right</v-icon>
                </span>
              </div>

              <!-- Subtle background number -->
              <div class="card-number">{{ index + 1 }}</div>
              <div class="card-glow"></div>
            </div>
          </transition>
        </v-col>
      </v-row>

      <!-- Detailed Info Modal -->
      <v-dialog v-model="modalOpen" max-width="900" transition="dialog-bottom-transition" scrollable>
        <v-card v-if="selectedActivity" class="details-modal">
          <v-toolbar color="transparent" flat class="modal-header pt-4 px-4 align-center">
            <div class="modal-icon-small" :class="selectedActivity.color">
              <v-icon color="white">{{ selectedActivity.icon }}</v-icon>
            </div>
            <v-toolbar-title class="modal-title ml-4">{{ selectedActivity.title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="modalOpen = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-divider></v-divider>

          <v-card-text class="modal-body py-10 px-10">
            <div class="activity-full-content" v-html="selectedActivity.fullContent"></div>

            <!-- Activity Gallery -->
            <div v-if="selectedActivity.images && selectedActivity.images.length > 0" class="mt-12">
              <h3 class="gallery-title mb-8">Activity Gallery</h3>
              <v-row>
                <v-col 
                  v-for="(img, idx) in selectedActivity.images" 
                  :key="idx"
                  cols="12" 
                  sm="6"
                >
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card
                      v-bind="props"
                      :elevation="isHovering ? 12 : 2"
                      class="gallery-card overflow-hidden"
                      rounded="xl"
                    >
                      <v-img
                        :src="img"
                        height="300"
                        cover
                        class="align-end"
                      >
                        <template v-slot:placeholder>
                          <div class="d-flex align-center justify-center fill-height bg-grey-lighten-4">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                          </div>
                        </template>
                      </v-img>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </div>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions class="py-4 px-6">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="elevated"
              class="close-modal-btn px-6"
              rounded
              @click="modalOpen = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'ProjectActivitiesSection',
  data() {
    return {
      showTitle: false,
      showText: false,
      modalOpen: false,
      selectedActivity: null,
      activities: [
        {
          title: "Worker List Compilation",
          summary: "A comprehensive and verified list of 1,500 tea garden workers as a prerequisite for all project activities.",
          icon: "mdi-clipboard-check",
          color: "card-green",
          fullContent: `
            <h3>Methods</h3>
            <p>A comprehensive and verified list of tea garden workers was developed as a prerequisite for all project activities to ensure accurate population coverage and representative participant selection.</p>
            <h3>Categorization</h3>
            <ul>
              <li>Worker information was initially compiled from tea garden management records and Union Parishad databases, with support from the Union Parishad Chairman.</li>
              <li>Trained community volunteers conducted household-level verification to confirm demographic details and employment status, and to resolve any discrepancies.</li>
              <li>Verified individuals were categorized as housewives, permanent tea workers, or temporary tea workers, including both male and female community members.</li>
            </ul>
            <h3>Outcome</h3>
            <ul>
              <li>The finalized master list comprised 1,500 individuals from three selected tea gardens—Alinagar Tea Estate, Baraoora Tea Estate, and Kalighat Tea Estate.</li>
              <li>This list served as the sampling frame for baseline surveys, qualitative in-depth interviews, and the mHealth intervention, ensuring methodological consistency and representativeness across all project components.</li>
            </ul>
          `
        },
        {
          title: "Baseline Survey",
          summary: "Conducted to assess knowledge, attitudes, and barriers related to SRHR among tea garden workers.",
          icon: "mdi-chart-box-outline",
          color: "card-blue",
          images: [
            '/baseline/baseline_1.png',
            '/baseline/baseline_2.png',
            '/baseline/baseline_3.png',
            '/baseline/baseline_4.png'
          ],
          fullContent: `
            <h3>Focus Areas</h3>
            <p>A baseline survey was conducted to assess knowledge, attitudes, practices, and barriers related to SRHR among tea garden workers. The findings guided intervention development.</p>
            <h3>Methodology</h3>
            <ul>
              <li>Participants were selected using systematic random sampling with probability proportional to size (PPS) from the verified master list to ensure representativeness across age groups, genders, and worker categories.</li>
              <li>Field volunteers received comprehensive training on survey objectives, ethical standards, informed consent, confidentiality, and culturally appropriate data collection.</li>
              <li>Data were gathered through in-person household interviews to guarantee privacy and participant comfort.</li>
              <li>Structured and semi-structured questionnaires included sociodemographic information, maternal health, gender-based violence, early marriage, menstrual hygiene, and sexually transmitted infections (STIs).</li>
            </ul>
            <h3>Outcome</h3>
            <ul>
              <li>The survey generated comprehensive quantitative data on SRHR knowledge, attitudes, and practices.</li>
              <li>Identified key gaps and priority areas, guiding targeted intervention planning and evaluation.</li>
            </ul>
          `
        },
        {
          title: "Qualitative IDIs",
          summary: "18 in-depth interviews examining perceptions, beliefs, and unmet needs regarding SRHR.",
          icon: "mdi-microphone-variant",
          color: "card-teal",
          fullContent: `
            <h3>Overview</h3>
            <p>Qualitative in-depth interviews were carried out to examine attitudes, perceptions, beliefs, and unmet needs related to SRHR among tea garden workers. These IDIs supplemented quantitative survey results by offering contextual insights into observed behaviors and service use patterns.</p>
            <h3>Methods</h3>
            <ul>
              <li>Participants were chosen through purposive sampling to ensure representation across gender, age groups (18–24, 25–35, 35+), education levels, and social strata.</li>
              <li>A total of 18 participants (six per tea garden) were included.</li>
              <li>Semi-structured interviews were conducted at participants’ homes or neutral community locations by trained interviewers.</li>
              <li>Trained interviewers facilitated discussions, recorded responses with informed consent, and maintained strict confidentiality.</li>
            </ul>
            <h3>Participant Profile</h3>
            <ul>
              <li>Adolescent girls married before 18 years.</li>
              <li>Recently delivered women (within the last 6–12 months, including those with delivery-related complications).</li>
              <li>Women reporting STI-related symptoms.</li>
              <li>Older women with previous childbirth exp  erience.</li>
              <li>Husbands of adolescent girls and recently delivered women.</li>
            </ul>
            <h3>Outcome</h3>
            <ul>
              <li>The IDIs provided contextual qualitative evidence on SRHR barriers, social norms, and service gaps, guiding the development of culturally appropriate and gender-sensitive interventions.</li>
            </ul>
          `
        },
        {
          title: "mHealth (Talk-Book) Development",
          summary: "Audio-based SRHR education for workers with low literacy, delivered in the local Bengali dialect.",
          icon: "mdi-book-open-page-variant",
          color: "card-orange",
          fullContent: `
            <h3>Concept</h3>
            <p>The Talk-Book mobile app was created to provide accessible sexual and reproductive health and rights (SRHR) education to tea garden workers with limited knowledge or low literacy. Many participants lack formal education or reliable health information. The app offers simple, clear, culturally appropriate messages in the local Bengali dialect, making sure everyone, regardless of literacy or prior awareness, can learn about their health, rights, and well-being.</p>
            <h3>Content Coverage</h3>
            <ul>
              <li><strong> Maternal Health - </strong> How to stay safe and healthy during pregnancy, childbirth, and postpartum, including check-ups, nutrition, safe delivery, and postpartum care.</li>
              <li><strong> Child Marriage - </strong> Why giving boys and girls time to grow up leads to healthier, happier lives, including awareness of health risks, social consequences, and legal protections.</li>
              <li><strong> Domestic (Gender-Based) Violence - </strong> How to recognize abuse at home or in the community, understand rights, and access support safely.</li>
              <li><strong> Menstrual Hygiene  - </strong> Understanding menstruation as a normal biological process, how to maintain hygiene, manage periods safely, and address misconceptions.</li>
              <li><strong> Sexually Transmitted Infections (STIs) - </strong> How STIs spread, their symptoms, prevention methods, and treatment options, emphasizing early detection and safe practices.</li>
            </ul>
            <h3>Design and Accessibility</h3>
            <ul>
              <li>Audio-based content ensures that participants with low literacy can easily understand and use the information.</li>
              <li>The app was installed on smartphones and tablets.</li>
              <li>For participants without smartphones, a library of pre-installed tablets was provided for borrowing through local community volunteers.</li>
              <li>Tablets require only a one-time internet setup and are free to use.</li>
            </ul>
            <h3>Development Process</h3>
            <ul>
              <li>Content scripts were drafted collaboratively by the Project Investigator and Project Coordinator.</li>
              <li>Planning and design meetings with RedOrange Communications finalized the app’s structure, user interface, and content features.</li>
              <li>The app was developed in Bengali to ensure accessibility for all participants.</li>
              <li>Iterative feedback from the project team refined content and functionality to ensure it was easy to understand, culturally relevant, and engaging for learners with limited knowledge.</li>
            </ul>
            <h3>Outcome</h3>
            <ul>
              <li>The Talk-Book app provides a culturally tailored, user-friendly platform for offline SRHR education.</li>
              <li>It serves as an interactive learning tool, enabling participants to gain knowledge, understand their rights, and make informed decisions about their health, regardless of literacy or prior awareness.</li>
            </ul>
          `
        },
        {
          title: "Tablet Distribution & Usage",
          summary: "Preloaded tablets provided to households without smartphones to ensure fair information access.",
          icon: "mdi-tablet-android",
          color: "card-purple",
          images: [
            '/tablet_distribution/tablet_distribution_1.png',
            '/tablet_distribution/tablet_distribution_2.png'
          ],
          fullContent: `
            <h3>Objective</h3>
            <p>To ensure fair access to SRHR information, participants without smartphones were given tablets preloaded with the Talk-Book app.</p>
            <h3>Methods</h3>
            <ul>
              <li>Priority was given to participants lacking personal devices, with local community volunteers responsible for managing distribution and usage.</li>
              <li>A total of 10 tablets were handed out across the three tea gardens.</li>
              <li>Each tablet was shared by two participants per week, allowing three days of use per participant.</li>
              <li>Volunteers ensured tablets were fully charged, obtained informed consent, and recorded participants’ signatures.</li>
              <li>Volunteers monitored tablet use to confirm that participants accessed the app and engaged with the content.</li>
            </ul>
            <h3>Outcome</h3>
            <ul >
              <li>This tablet-based approach, together with the mobile application, facilitated learning, promoted behavior change, and strengthened community engagement, ensuring SRHR content was accessible regardless of literacy or personal device ownership.</li>
            </ul>
          `
        },
        {
          title: "App Installation Orientations",
          summary: "15 trained volunteers conducting household visits to install the app and guide participants.",
          icon: "mdi-cellphone-arrow-down",
          color: "card-indigo",
          fullContent: `
            <h3>Process</h3>
            <p>Trained volunteers conducted household and community yard visits to install the Talk-Book app on participants’ smartphones and tablets.</p>
            <h3>Methods</h3>
            <ul>
              <li>A total of 15 volunteers were engaged across three tea gardens, with five volunteers per garden.</li>
              <li>Volunteers provided structured orientation on navigating the app, accessing audio-based SRHR content, and using interactive features.</li>
              <li>Installation used a project-provided internet connection for a one-time setup; no ongoing internet access was required.</li>
              <li>Tablets and smartphones with the app were provided free of cost, ensuring accessibility even for participants without regular connectivity.</li>
            </ul>
            <h3>Outcome</h3>
            <ul>
              <li>This approach ensured smooth installation, proper orientation, and sustainable use of the application, supporting participant engagement with project materials and promoting SRHR knowledge, self-directed learning, and behavior change.</li>
            </ul>
          `
        },
        {
          title: "Project Website",
          summary: "A central platform for knowledge sharing, transparency, and community engagement.",
          icon: "mdi-web",
          color: "card-cyan",
          fullContent: `
            <h3>Platform Overview</h3>
            <p>A dedicated website was developed to provide project information, reports, and educational content.</p>
            <h3>Content</h3>
            <ul>
              <li>Activities, SRHR contents, and resources, including multimedia materials and training resources for volunteers</li>
            </ul>
            <h3>Development</h3>
            <ul>
              <li>Designed by RedOrange Limited in collaboration with the project team to meet objectives and user needs.</li>
            </ul>
            <h3>Feedback & Improvement</h3>
            <ul>
              <li>Volunteer and community feedback was incorporated before the official launch to enhance usability and relevance.</li>
            </ul>
            <h3>Outcome</h3>
            <ul>
              <li>The website serves as a central platform for knowledge sharing, transparency, and community engagement.</li>
            </ul>
          `
        },
        {
          title: "Community Yard Meetings (Ongoing)",
          summary: "Weekly participatory learning sessions engaging 20-25 tea workers per meeting.",
          icon: "mdi-account-group-outline",
          color: "card-light-green",
          images: [
            '/cym/cym_1.png',
            '/cym/cym_2.png'
          ],
          fullContent: `
            <h3>Activity Description</h3>
            <p>18 weekly community yard meetings conducted to date, providing participatory learning and SRHR awareness.</p>
            <h3>Structure</h3>
            <ul>
              <li>A total of 18 weekly community yard meetings have been conducted so far, each engaging 20–25 tea workers</li>
              <li>Meetings provide participatory learning and SRHR awareness through interactive discussions, Q&A, and guidance on using the project’s mobile app.</li>
              <li>Topics include maternal health, menstrual hygiene, gender-based violence, early marriage, and STIs.</li>
            </ul>
            <h3>Outcome</h3>
            <ul>
              <li>These sessions continue to serve as a platform for tea workers to voice concerns, share experiences, and give feedback, ensuring the project remains community-driven.</li>
            </ul>
          `
        },
        {
          title: "Brochure Development and Distribution",
          summary: "Culturally appropriate informational brochures disseminated to at least one copy per household.",
          icon: "mdi-file-document-multiple-outline",
          color: "card-pink",
          images: [
            '/brochure/brochure_1.png',
            '/brochure/brochure_2.png'
          ],
          fullContent: `
            <h3>Objective</h3>
            <p>As part of the project’s community engagement strategy, informational brochures were developed to disseminate key SRHR messages.</p>
            <h3>Methods</h3>
            <ul>
              <li>Project staff and subject matter experts created clear, culturally appropriate, and easy-to-understand content.</li>
              <li>Brochures were designed with engaging visuals, graphics, and layouts to ensure readability for participants with varying literacy levels.</li>
              <li>Drafts were reviewed by the Project Investigator and community representatives, and feedback was incorporated into the final versions.</li>
              <li>Brochures were distributed during yard meetings, home visits, and other community activities, targeting at least one copy per household.</li>
            </ul>
            <h3>Outcome</h3>
            <ul>
              <li>These materials serve as complementary educational tools, reinforcing SRHR awareness, supporting behavior change, and strengthening the impact of other project interventions, including yard meetings and the mobile application.</li>
            </ul>
          `
        }
      ]
    }
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => { this.showTitle = true }, 100)
          setTimeout(() => { this.showText = true }, 300)
          observer.disconnect()
        }
      })
    }, { threshold: 0.1 })
    observer.observe(this.$refs.paSection)
  },
  methods: {
    openModal(activity) {
      this.selectedActivity = activity
      this.modalOpen = true
    }
  }
}
</script>

<style scoped>
.activities-section {
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

/* Background */
.bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.shape { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.05; }
.shape-1 { width: 600px; height: 600px; background: #4d870f; top: -200px; left: -200px; }
.shape-2 { width: 600px; height: 600px; background: #2196F3; bottom: -200px; right: -200px; }

/* Typography */
.title-badge {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(77, 135, 15, 0.08);
  color: #4d870f;
  border-radius: 50px;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 900;
  color: #1a1a1a;
  letter-spacing: -1.5px;
}

.text-gradient {
  background: linear-gradient(135deg, #4d870f, #7cb342);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  font-size: 1.15rem;
  color: #555;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

/* Activity Cards */
.activity-card {
  position: relative;
  background: white;
  border-radius: 32px;
  padding: 40px;
  width: 100%;
  margin-bottom: 30px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background: linear-gradient(145deg, #ffffff, #f9f9f9);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  z-index: 1;
  animation: slideUp 0.8s backwards;
  animation-delay: var(--delay);
}

@keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

.activity-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.08);
  border-color: rgba(77, 135, 15, 0.2);
}

.card-icon-container {
  width: 80px;
  height: 80px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease;
}

.activity-card:hover .card-icon-container { transform: scale(1.1) rotate(5deg); }

/* Color variants */
.card-green { background: linear-gradient(135deg, #448a0a, #7cb342); }
.card-blue { background: linear-gradient(135deg, #2196F3, #03A9F4); }
.card-teal { background: linear-gradient(135deg, #009688, #4DB6AC); }
.card-orange { background: linear-gradient(135deg, #FF9800, #FFB74D); }
.card-purple { background: linear-gradient(135deg, #9C27B0, #BA68C8); }
.card-indigo { background: linear-gradient(135deg, #3F51B5, #7986CB); }
.card-cyan { background: linear-gradient(135deg, #00BCD4, #4DD0E1); }
.card-light-green { background: linear-gradient(135deg, #8BC34A, #AED581); }
.card-pink { background: linear-gradient(135deg, #E91E63, #F06292); }

.card-title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 12px;
  line-height: 1.3;
}

.card-summary {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
}

.read-more-btn {
  font-size: 0.85rem;
  font-weight: 800;
  color: #4d870f;
  display: flex;
  align-items: center;
  transition: gap 0.3s ease;
}

.activity-card:hover .read-more-btn { gap: 8px; }

.card-number {
  position: absolute;
  top: 40px;
  right: 40px;
  font-size: 3rem;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.03);
  line-height: 1;
}

/* Modal Styling */
.details-modal {
  border-radius: 40px !important;
  overflow: hidden;
  background: #fdfdfd !important;
}

.modal-header {
  height: 120px !important;
  display: flex !important;
  align-items: center !important;
}

.modal-icon-small {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-title {
  font-size: 1.8rem !important;
  font-weight: 900 !important;
  color: #1a1a1a !important;
}

.modal-body {
  background: white;
  min-height: 50vh;
}

.activity-full-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 800;
  color: #2b2b2b;
  margin-top: 30px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.activity-full-content :deep(h3)::before {
  content: "";
  width: 4px;
  height: 20px;
  background: #4d870f;
  margin-right: 12px;
  border-radius: 2px;
}

.activity-full-content :deep(p) {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 20px;
}

.activity-full-content :deep(ul) {
  padding-left: 20px;
  margin-bottom: 25px;
}

.activity-full-content :deep(li) {
  font-size: 1.05rem;
  color: #444;
  margin-bottom: 10px;
  line-height: 1.6;
}

.close-modal-btn {
  background: linear-gradient(135deg, #4d870f, #7cb342) !important;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0.5px;
  height: 48px !important;
}

/* Gallery Styling */
.gallery-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a1a;
  display: flex;
  align-items: center;
}

.gallery-title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin-left: 20px;
}

.gallery-card {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
  border: 4px solid white;
}

.gallery-card:hover {
  transform: scale(1.02);
}

/* Animation utilities */
.fade-slide-up-enter-active { animation: slideUp 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }

/* Responsive */
@media (max-width: 960px) {
  .section-title { font-size: 2.8rem; }
  .activity-card { padding: 30px; }
  .card-number { top: 30px; right: 30px; }
}

@media (max-width: 600px) {
  .section-title { font-size: 2.2rem; }
  .modal-title { font-size: 1.3rem !important; }
  .modal-body { padding: 30px 20px !important; }
  .card-title { font-size: 1.2rem; }
}
</style>
