import AceEditor from 'react-ace';
import ace from 'ace-builds/src-noconflict/ace';
import "ace-builds/src-noconflict/ext-language_tools"
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/snippets/python';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs} from 'firebase/firestore';
import { db } from '../../config/firebase';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-terminal';


const ALL_THEMES = {
  'monokai': 'Monokai',
  'github': 'Github',
  'tomorrow': 'Tomorrow',
  'kuroir': 'Kuroir',
  'twilight': 'Twilight',
  'xcode': 'Xcode',
  'textmate': 'Textmate',
  'solarized_dark': 'Solarized Dark',
  'solarized_light': 'Solarized Light',
  'terminal': 'Terminal'
}


function Editor({problemId, handleRun}) {
  const [code, setCode] = useState('')
  const [theme, setTheme] = useState('monokai')

  useEffect(()=>{
    const fetchCode = async()=>{
      const q = query(collection(db, 'languageCodes'), where('problemId', '==', problemId), where('landCode', '==', 'py'))
      const data  = await getDocs(q)
      const dt = data.docs[0]
      if(dt) setCode(dt.data().code)
    }
    if(problemId) fetchCode()
  },[])

  ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict')
  return (
    <div style={{height: '90vh'}}>
      <div className="d-flex justify-content-end mb-1 ms-2">
        {code && <button className='btn btn-sm btn-primary ' onClick={()=>handleRun(code)}>run</button>}

        <div className="btn-group ms-2 mr-2 ">
          <button type="button" className="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            {ALL_THEMES[theme]}
          </button>
          <ul className="dropdown-menu">
            {
              Object.keys(ALL_THEMES).map((value)=>{
                return <li key={value} ><span onClick={()=>setTheme(value)} className="dropdown-item" type='button' >{ALL_THEMES[value]}</span></li>
              })
            }
          </ul>
        </div>
      </div>
      <AceEditor
        placeholder=""
        width='100%'
        height='95%'
        mode="python"
        theme={theme}
        name="codex-editor"
        onChange={setCode}
        fontSize={17}
        wrapEnabled={true}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        setOptions={{
          wrapBehavioursEnabled:true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}/>
    </div>
  )
}

export default Editor
