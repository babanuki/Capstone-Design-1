int plus[3]={4, 15, 23};
int gnd[3]={16, 2, 5};
int trig=12;
int echo=14;

void setup() {
  Serial.begin(9600);
  
  for(int i=0; i<3; i++){
    pinMode(plus[i], OUTPUT);
    pinMode(gnd[i], OUTPUT);
  }

  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  
  digitalWrite(trig, 1);
  delayMicroseconds(10);
  digitalWrite(trig, 0);
  float dist=(float)pulseIn(echo, 1)*17/1000;
  
  printf("%f cm\n", dist);

  if(dist<=10.0){
    for(int k=0; k<3; k++){
      digitalWrite(plus[k], 1);
      delay((3-k)*100);
    }
    for(int k=0; k<3; k++){
      digitalWrite(plus[k], 0);
      delay((k+1)*100);
    }
  }
}
