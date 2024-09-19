<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegistrerController extends Controller
{
    // By convention, if a method has a View, it must be put in the index function
    public function index() {
        return view('auth.register');
    }

    public function store(Request $request) {
        // dd($request);
        $request->request->add(['username' => Str::slug($request->username)]);
        
        // Validation
        $this->validate($request, [
            'name' => 'required|min:5',
            'username' => 'required|unique:users|min:3|max:30',
            'email' => 'required|unique:users|email',
            'password' => 'required|confirmed|min:6',
        ]);

        User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // auth()->attempt([
        //     'email' => $request->email,
        //     'password' => $request->password
        // ]);

        // Another way of authentication
        auth()->attempt($request->only('email', 'password'));

        return redirect()->route('posts.index', auth()->user()->username);
    }
}