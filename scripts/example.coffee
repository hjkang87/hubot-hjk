# Description:
#   Example scripts for you to examine and try out.
#
# Notes:
#   They are commented out by default, because most of them are pretty silly and
#   wouldn't be useful and amusing enough for day to day huboting.
#   Uncomment the ones you want to try and experiment with.
#
#   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md


excuse = [
    "That's weird...",
    "It's never done that before.",
    "It worked yesterday.",
    "How is that possible?",
    "It must be a hardware problem.",
    "What did you type in wrong to get it to crash?",
    "There is something funky in your data.",
    "I haven't touched that module in weeks!",
    "You must have the wrong version.",
    "It's just some unlucky coincidence.",
    "I can't test everything!",
    "THIS can't be the source of THAT.",
    "It works, but it hasn't been tested.",
    "Somebody must have changed my code.",
    "Did you check for a virus on your system?",
    "Even though it doesn't work, how does it feel?",
    "You can't use that version on your system.",
    "Why do you want to do it that way?",
    "Where were you when the program blew up?",
    "It works on my machine."
]

excuse_kr = [
    "희한하네...",
    "한 번도 그런 적 없는데..",
    "어제는 됐는데...",
    "그럴 리가 없는데..?",
    "하드웨어 문제입니다.",
    "무슨 짓을 했길래 에러가 떠요?",
    "인풋에 문제가 있겠죠..",
    "그 모듈 안건드렸거든요??",
    "구버전 쓰시는거 아니예요?",
    "가끔 그럴 수도 있어요..",
    "일일이 다 테스트를 어떻게 해요.",
    "그게 꼭 이것 때문이라고 할 수는 없죠..",
    "될 거예요. 해보진 않았지만..",
    "누가 내 코드를 건드렸나..?",
    "백신 깔았어요?",
    "안되는 건 아는데, 어떤 것 같아요?",
    "그 버전 쓰시면 당연히 안되죠",
    "왜 그런식으로 돌려요?",
    "크래시 날 때 뭐 하고 있었어요?",
    "제 PC에선 되거든요."
]

module.exports = (robot) ->

    robot.hear /not my fault|is broken|is not working|has problem/i, (res) ->
        res.send res.random excuse

    robot.hear /안돼요/i, (res) ->
        res.send res.random excuse_kr


  # robot.hear /badger/i, (res) ->
  #   res.send "Badgers? BADGERS? WE DON'T NEED NO STINKIN BADGERS"
  #
  # robot.respond /open the (.*) doors/i, (res) ->
  #   doorType = res.match[1]
  #   if doorType is "pod bay"
  #     res.reply "I'm afraid I can't let you do that."
  #   else
  #     res.reply "Opening #{doorType} doors"
  #
  # robot.hear /I like pie/i, (res) ->
  #   res.emote "makes a freshly baked pie"
  #
  # lulz = ['lol', 'rofl', 'lmao']
  #
  # robot.respond /lulz/i, (res) ->
  #   res.send res.random lulz
  #
  # robot.topic (res) ->
  #   res.send "#{res.message.text}? That's a Paddlin'"
  #
  #
  # enterReplies = ['Hi', 'Target Acquired', 'Firing', 'Hello friend.', 'Gotcha', 'I see you']
  # leaveReplies = ['Are you still there?', 'Target lost', 'Searching']
  #
  # robot.enter (res) ->
  #   res.send res.random enterReplies
  # robot.leave (res) ->
  #   res.send res.random leaveReplies
  #
  # answer = process.env.HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING
  #
  # robot.respond /what is the answer to the ultimate question of life/, (res) ->
  #   unless answer?
  #     res.send "Missing HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING in environment: please set and try again"
  #     return
  #   res.send "#{answer}, but what is the question?"
  #
  # robot.respond /you are a little slow/, (res) ->
  #   setTimeout () ->
  #     res.send "Who you calling 'slow'?"
  #   , 60 * 1000
  #
  # annoyIntervalId = null
  #
  # robot.respond /annoy me/, (res) ->
  #   if annoyIntervalId
  #     res.send "AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH"
  #     return
  #
  #   res.send "Hey, want to hear the most annoying sound in the world?"
  #   annoyIntervalId = setInterval () ->
  #     res.send "AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH"
  #   , 1000
  #
  # robot.respond /unannoy me/, (res) ->
  #   if annoyIntervalId
  #     res.send "GUYS, GUYS, GUYS!"
  #     clearInterval(annoyIntervalId)
  #     annoyIntervalId = null
  #   else
  #     res.send "Not annoying you right now, am I?"
  #
  #
  # robot.router.post '/hubot/chatsecrets/:room', (req, res) ->
  #   room   = req.params.room
  #   data   = JSON.parse req.body.payload
  #   secret = data.secret
  #
  #   robot.messageRoom room, "I have a secret: #{secret}"
  #
  #   res.send 'OK'
  #
  # robot.error (err, res) ->
  #   robot.logger.error "DOES NOT COMPUTE"
  #
  #   if res?
  #     res.reply "DOES NOT COMPUTE"
  #
  # robot.respond /have a soda/i, (res) ->
  #   # Get number of sodas had (coerced to a number).
  #   sodasHad = robot.brain.get('totalSodas') * 1 or 0
  #
  #   if sodasHad > 4
  #     res.reply "I'm too fizzy.."
  #
  #   else
  #     res.reply 'Sure!'
  #
  #     robot.brain.set 'totalSodas', sodasHad+1
  #
  # robot.respond /sleep it off/i, (res) ->
  #   robot.brain.set 'totalSodas', 0
  #   res.reply 'zzzzz'
