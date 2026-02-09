package process

type Signal int

const (
	SigTerm Signal = iota
	SigKill
	SigQuit
)
