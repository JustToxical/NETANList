import { store } from "../main.js";
import { embed } from "../util.js";
import { score } from "../score.js";
import Spinner from "../components/Spinner.js";
import LevelAuthors from "../components/List/LevelAuthors.js";

const roleIconMap = {
    owner: "crown",
    admin: "user-gear",
    helper: "user-shield",
    dev: "code",
    trial: "user-lock",
};

export default {
    components: { Spinner, LevelAuthors },
    template: `
        <main v-if="loading">
            <Spinner />
        </main>
        <main v-else class="page-list">
            <div class="list-container">
                <div class="list-section">
                    <table class="list" v-if="rankedList.length">
                        <tr v-for="(level, i) in rankedList" :key="i">
                            <td class="rank">
                                <p class="type-label-lg">#{{ i + 1 }}</p>
                            </td>
                            <td class="level" :class="{ 'active': selected == i }">
                                <button @click="selectRanked(i)">
                                    <span class="type-label-lg">{{ level.name }}</span>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="legacy-section" v-if="legacyList.length">
                    <div class="legacy-title">Legacy</div>
                    <div class="legacy-levels">
                        <div
                            class="level"
                            v-for="(level, j) in legacyList"
                            :class="{ 'active': selected == j + rankedList.length }"
                            :key="j"
                        >
                            <button @click="selectLegacy(j)">
                                <span class="type-label-lg">{{ level.name }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="level-container">
                <div class="level" v-if="level">
                    <h1>{{ level.name }}</h1>
                    <LevelAuthors :author="level.author" :creators="level.creators" :verifier="level.verifier" />
                    <iframe class="video" id="videoframe" :src="video" frameborder="0"></iframe>
                    <ul class="stats">
                        <li>
                            <div class="type-title-sm">Points when completed</div>
                            <p>{{ score(selectedRank + 1, 100, level.percentToQualify) }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">ID</div>
                            <p>{{ level.id }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">Password</div>
                            <p>{{ level.password || 'Free to Copy' }}</p>
                        </li>
                    </ul>
                    <h2>Records</h2>
                    <p v-if="selectedRank + 1 <= 75"><strong>{{ level.percentToQualify }}%</strong> or better to qualify</p>
                    <p v-else-if="selectedRank + 1 <= 150"><strong>100%</strong> or better to qualify</p>
                    <p v-else>This level does not accept new records.</p>
                    <table class="records">
                        <tr v-for="record in level.records" class="record" :key="record.user">
                            <td class="percent"><p>{{ record.percent }}%</p></td>
                            <td class="user">
                                <a :href="record.link" target="_blank" class="type-label-lg">{{ record.user }}</a>
                            </td>
                            <td class="mobile">
                                <img v-if="record.mobile" :src="\`/assets/phone-landscape\${store.dark ? '-dark' : ''}.svg\`" alt="Mobile">
                            </td>
                            <td class="fps"><p>{{ record.hz }}FPS</p></td>
                        </tr>
                    </table>
                </div>
                <div v-else class="level" style="height: 100%; justify-content: center; align-items: center;">
                    <p>(ノಠ益ಠ)ノ彡┻━┻</p>
                </div>
            </div>
        </main>
    `,
    data: () => ({
        list: [],
        selected: 0,
        loading: true,
        store,
    }),
    computed: {
        rankedList() {
            return this.list.slice(0, 150);
        },
        legacyList() {
            return this.list.slice(150);
        },
        level() {
            if (this.selected < this.rankedList.length) {
                return this.rankedList[this.selected];
            } else {
                return this.legacyList[this.selected - this.rankedList.length];
            }
        },
        selectedRank() {
            return this.selected;
        },
        video() {
            if (!this.level?.showcase) {
                return embed(this.level?.verification);
            }
            return embed(this.level.showcase || this.level.verification);
        }
    },
    methods: {
        embed,
        score,
        selectRanked(i) {
            this.selected = i;
        },
        selectLegacy(j) {
            this.selected = j + this.rankedList.length;
        }
    },
    async mounted() {
        try {
            const res = await fetch("/data/_levels.json"); // <--- make sure file is inside /data folder
            this.list = await res.json();
        } catch (error) {
            console.error("Failed to load levels:", error);
        }
        this.loading = false;
    }
};
