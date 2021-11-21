import {toRefs, reactive, watch} from '@vue/composition-api';
export default function(url, options){
    const state = reactive({
        response: [],
        error:null,
        fetching: true
    })

    const fetchData = async () => {
        try{
            const res = await fetch(url, options);
            const json = await res.json();
            state.response = json;
        } catch(errors) {
            state.error = errors;
        } finally {
            state.fetching = false;
        }
    };

    return {val, ...toRefs(state), fetchData};
}