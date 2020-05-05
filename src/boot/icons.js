import {
  mdiPlus,
  mdiClose,
  mdiPageFirst,
  mdiPageLast,
  mdiHomeVariant,
  mdiImageFilterHdr,
  mdiGamepad,
  mdiAt,
  mdiHelp,
  mdiChevronLeft,
  mdiChevronRight
} from "@quasar/extras/mdi-v4";

export default async ({ Vue}) => {
  Vue.mixin({
    beforeCreate: function () {
      this.Icons = {
        mdiPlus,
        mdiClose,
        mdiPageFirst,
        mdiPageLast,
        mdiHomeVariant,
        mdiImageFilterHdr,
        mdiGamepad,
        mdiAt,
        mdiHelp,
        mdiChevronLeft,
        mdiChevronRight
      }
    }
  })
}
