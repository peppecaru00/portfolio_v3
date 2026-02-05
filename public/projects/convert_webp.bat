for %%i in (*.mp4) do ffmpeg -i "%%i" -b 1.5M -c:v libsvtav1 -preset 4 -vf scale="iw/2:ih/2" "conv/%%~ni.mp4"
pause