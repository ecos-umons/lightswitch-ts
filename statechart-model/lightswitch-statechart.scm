{
  "modelId": "15091ded-d6df-4dd5-916c-5c6f27a6d8be",
  "graph": {
    "cells": [
      {
        "position": {
          "x": 0,
          "y": 0
        },
        "size": {
          "height": 10,
          "width": 10
        },
        "angle": 0,
        "type": "Statechart",
        "id": "00ffb6d1-d225-4bc0-8b73-7df9987f57b7",
        "linkable": false,
        "z": 1,
        "attrs": {
          "name": {
            "text": "DimmableLamp"
          },
          "specification": {
            "text": "@EventDriven\n@SuperSteps(no)\n\ninterface:\n var brightness: integer\n var memory: integer = min\n const max: integer = 10\n const min: integer = 5\n in event toggle\n in event increase\n in event decrease"
          }
        }
      },
      {
        "type": "State",
        "position": {
          "x": -41,
          "y": -228
        },
        "size": {
          "height": 60,
          "width": 193.4296875
        },
        "angle": 0,
        "fixedRatio": false,
        "embedable": true,
        "linkable": true,
        "id": "a4f3408e-c372-428e-aa3a-b752a05baeb1",
        "z": 16,
        "marker": [
          "Could not find declaration of brightness"
        ],
        "attrs": {
          "name": {
            "text": "Off"
          },
          "specification": {
            "text": "entry / brightness = 0"
          }
        }
      },
      {
        "type": "Entry",
        "position": {
          "x": -106,
          "y": -205.5
        },
        "size": {
          "height": 15,
          "width": 15
        },
        "angle": 0,
        "fixedRatio": true,
        "embedable": false,
        "linkable": true,
        "id": "2acc884f-815b-432c-aac1-3afa14a6b16f",
        "z": 18,
        "embeds": [
          "27ad2ed7-67f5-4971-93e5-955068970593"
        ],
        "attrs": {}
      },
      {
        "type": "NodeLabel",
        "label": true,
        "size": {
          "width": 15,
          "height": 15
        },
        "position": {
          "x": -106,
          "y": -190.5
        },
        "id": "27ad2ed7-67f5-4971-93e5-955068970593",
        "z": 19,
        "parent": "2acc884f-815b-432c-aac1-3afa14a6b16f",
        "attrs": {
          "label": {
            "refX": "50%",
            "textAnchor": "middle",
            "refY": "50%",
            "textVerticalAnchor": "middle"
          }
        }
      },
      {
        "type": "Transition",
        "source": {
          "id": "2acc884f-815b-432c-aac1-3afa14a6b16f"
        },
        "target": {
          "id": "a4f3408e-c372-428e-aa3a-b752a05baeb1",
          "anchor": {
            "name": "topLeft",
            "args": {
              "dx": 39,
              "dy": 36,
              "rotate": true
            }
          },
          "priority": true
        },
        "router": {
          "name": "orthogonal",
          "args": {
            "padding": 8
          }
        },
        "connector": {
          "name": "rounded"
        },
        "labels": [
          {
            "attrs": {},
            "position": {}
          },
          {
            "attrs": {
              "label": {
                "text": "1"
              }
            }
          }
        ],
        "id": "743f790b-43ac-424d-a1ac-e5d5fc0cf7f9",
        "z": 20,
        "attrs": {}
      },
      {
        "type": "State",
        "position": {
          "x": 319,
          "y": -37
        },
        "size": {
          "height": 60,
          "width": 359.0546875
        },
        "angle": 0,
        "fixedRatio": false,
        "embedable": true,
        "linkable": true,
        "id": "88edc2a9-f652-4a8e-adb6-3a181699c2a9",
        "z": 24,
        "marker": [
          "Local reactions are never executed due to completion transition."
        ],
        "attrs": {
          "name": {
            "text": "Switching Off"
          },
          "specification": {
            "text": "every 1s [brightness>0] / brightness -= 1"
          }
        }
      },
      {
        "type": "State",
        "position": {
          "x": 319,
          "y": -228
        },
        "size": {
          "height": 116.484375,
          "width": 359.0546875
        },
        "angle": 0,
        "fixedRatio": false,
        "embedable": true,
        "linkable": true,
        "id": "719f097c-350a-4e8d-95b8-9a1ed133edbd",
        "z": 26,
        "marker": [
          "Could not find declaration of decrease<br>Trigger 'decrease' is no event."
        ],
        "attrs": {
          "name": {
            "text": "On"
          },
          "specification": {
            "text": "entry / brightness = memory\nexit / memory = brightness\nincrease [brightness < max] / brightness += 1\ndecrease [brightness > min] / brightness -= 1"
          }
        }
      },
      {
        "type": "Transition",
        "source": {
          "id": "88edc2a9-f652-4a8e-adb6-3a181699c2a9"
        },
        "target": {
          "id": "719f097c-350a-4e8d-95b8-9a1ed133edbd",
          "anchor": {
            "name": "topLeft",
            "args": {
              "dx": 151,
              "dy": 109,
              "rotate": true
            }
          },
          "priority": true
        },
        "router": {
          "name": "orthogonal",
          "args": {
            "padding": 8
          }
        },
        "connector": {
          "name": "rounded"
        },
        "labels": [
          {
            "attrs": {
              "text": {
                "text": "toggle"
              }
            },
            "position": {
              "distance": 0.5000000286665387,
              "offset": 26,
              "angle": 0
            }
          },
          {
            "attrs": {
              "label": {
                "text": "1"
              }
            }
          }
        ],
        "id": "26a8e4cd-26b0-465a-b52a-8932bc943131",
        "z": 27,
        "vertices": [],
        "marker": [
          "Dead transition. This transition is never taken due to the precedence of completion transition."
        ],
        "attrs": {}
      },
      {
        "type": "Transition",
        "source": {
          "id": "a4f3408e-c372-428e-aa3a-b752a05baeb1"
        },
        "target": {
          "id": "719f097c-350a-4e8d-95b8-9a1ed133edbd",
          "anchor": {
            "name": "topLeft",
            "args": {
              "dx": 33,
              "dy": 42,
              "rotate": true
            }
          },
          "priority": true
        },
        "router": {
          "name": "orthogonal",
          "args": {
            "padding": 8
          }
        },
        "connector": {
          "name": "rounded"
        },
        "labels": [
          {
            "attrs": {
              "text": {
                "text": "toggle"
              }
            },
            "position": {
              "distance": 0.4999999773342243,
              "offset": 14.999999999999998,
              "angle": 0
            }
          },
          {
            "attrs": {
              "label": {
                "text": "1"
              }
            }
          }
        ],
        "id": "c5187c10-fb24-4360-9c5f-5b4e5548cbb6",
        "z": 27,
        "marker": [
          "Could not find declaration of toggle\nTrigger 'toggle' is no event."
        ],
        "vertices": [],
        "attrs": {}
      },
      {
        "type": "Transition",
        "source": {
          "id": "719f097c-350a-4e8d-95b8-9a1ed133edbd"
        },
        "target": {
          "id": "88edc2a9-f652-4a8e-adb6-3a181699c2a9",
          "anchor": {
            "name": "topLeft",
            "args": {
              "dx": 75.00860595703125,
              "dy": 24,
              "rotate": true
            }
          },
          "priority": true
        },
        "router": {
          "name": "orthogonal",
          "args": {
            "padding": 8
          }
        },
        "connector": {
          "name": "rounded"
        },
        "labels": [
          {
            "attrs": {
              "text": {
                "text": "after 10s"
              }
            },
            "position": {
              "distance": 0.4999999713334612,
              "offset": 38.99999023437499,
              "angle": 0
            }
          },
          {
            "attrs": {
              "label": {
                "text": "2"
              }
            }
          }
        ],
        "id": "04132dd2-3a2a-4002-bbbc-2a455d3e2295",
        "z": 27,
        "vertices": [],
        "attrs": {}
      },
      {
        "type": "Transition",
        "source": {
          "id": "719f097c-350a-4e8d-95b8-9a1ed133edbd"
        },
        "target": {
          "id": "a4f3408e-c372-428e-aa3a-b752a05baeb1",
          "anchor": {
            "name": "topLeft",
            "args": {
              "dx": 162,
              "dy": 25,
              "rotate": true
            }
          },
          "priority": true
        },
        "router": {
          "name": "orthogonal",
          "args": {
            "padding": 8
          }
        },
        "connector": {
          "name": "rounded"
        },
        "labels": [
          {
            "attrs": {
              "text": {
                "text": "toggle"
              }
            },
            "position": {
              "distance": 0.5000000226657757,
              "offset": 14.999999999999998,
              "angle": 0
            }
          },
          {
            "attrs": {
              "label": {
                "text": "1"
              }
            }
          }
        ],
        "id": "949e5745-ba9e-446e-8363-86c350ada35d",
        "z": 27,
        "vertices": [],
        "attrs": {}
      },
      {
        "type": "Transition",
        "source": {
          "id": "88edc2a9-f652-4a8e-adb6-3a181699c2a9"
        },
        "target": {
          "id": "a4f3408e-c372-428e-aa3a-b752a05baeb1",
          "anchor": {
            "name": "topLeft",
            "args": {
              "dx": 93,
              "dy": 50,
              "rotate": true
            }
          },
          "priority": true
        },
        "router": {
          "name": "orthogonal",
          "args": {
            "padding": 8
          }
        },
        "connector": {
          "name": "rounded"
        },
        "labels": [
          {
            "attrs": {
              "text": {
                "text": "[brightness == 0]"
              }
            },
            "position": {}
          },
          {
            "attrs": {
              "label": {
                "text": "2"
              }
            }
          }
        ],
        "id": "faa38489-229c-4922-ac7d-e85e2bc917aa",
        "z": 28,
        "vertices": [
          {
            "x": 78,
            "y": -7
          }
        ],
        "attrs": {}
      }
    ]
  },
  "genModel": {
    "generator": {
      "schemaKey": "yakindu::c",
      "LicenseHeader": {
        "licenseText": ""
      },
      "FunctionInlining": {
        "inlineReactions": false,
        "inlineEntryActions": false,
        "inlineExitActions": false,
        "inlineEnterSequences": false,
        "inlineExitSequences": false,
        "inlineChoices": false,
        "inlineEnterRegion": false,
        "inlineExitRegion": false,
        "inlineEntries": false
      },
      "OutEventAPI": {
        "observables": false,
        "getters": false
      },
      "IdentifierSettings": {
        "moduleName": "MyStatechart",
        "statemachinePrefix": "myStatechart",
        "separator": "_",
        "headerFilenameExtension": "h",
        "sourceFilenameExtension": "c"
      },
      "Tracing": {
        "enterState": false,
        "exitState": false,
        "generic": false
      },
      "Includes": {
        "useRelativePaths": false
      },
      "GeneratorOptions": {
        "userAllocatedQueue": false,
        "metaSource": false
      },
      "GeneralFeatures": {
        "timerService": false
      }
    }
  }
}